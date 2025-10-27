import { Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import ScoreList from '@/components/HighScores';
import * as SecureStore from 'expo-secure-store';
import HeaderReact from '@/components/header';
import { serverurl } from '@/gameLogic/urls'
import FormularioIngreso from '@/components/Formulario';

export default function Profile() 
{
  const router = useRouter();
  const [googleuser, setGoogleuser] = useState(false);
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [newnombre, setNewNombre] = useState('');

  const [tipo, setTipo] = useState(false);
  const formdata = new FormData();

  useEffect(() => {
    (async () => {
        let savedMail, google;
        if(Platform.OS === 'web')
        {
            savedMail = localStorage.getItem('email');
            google = localStorage.getItem('isGoogleUser');
        }
        else
        {
            savedMail = await SecureStore.getItemAsync('email');
            google = await SecureStore.getItemAsync('isGoogleUser');
        }
        setEmail(savedMail || '');
        setGoogleuser(google == 'true');

        if(!savedMail || savedMail == '')
        {
            router.replace('/');
            return;
        }

        fetch(serverurl + 'getdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: savedMail }),
        })
        .then(response => response.json())
        .then(data => {
            setNombre(data[0].nombre);
            setNewNombre(data[0].nombre);
            formdata.append('nombre', data[0].nombre); 
            formdata.append('email', savedMail); 
        });
    })();
  }, []);

  async function saveUsuario(altemail : string, google : boolean)
  {
    if(Platform.OS === 'web')
    {
        localStorage.setItem('email', altemail);
        localStorage.setItem('isGoogleUser', google + '');
    }
    else
    {
        await SecureStore.setItemAsync('email', altemail);
        await SecureStore.setItemAsync('isGoogleUser', google + '');
    }
  }

  async function saveChanges(fm: FormData) 
  {
    let res = await fetch(serverurl + 'edituser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: fm.get('nombre'),
            email: fm.get('newemail') || '',
            password: fm.get('newpassword') || '',
            oldemail: fm.get('email') || email,
            oldpassword: fm.get('password') || '',
            isGoogleUser: googleuser + '',
        }),
    });
    let data = await res.json();
    if(data == 3) return 1;
    else if(data == 4) return 4;
    else
    {
        await saveUsuario(fm.get('newemail') == null ? email : fm.get('newemail') as any, googleuser);
        router.push("/profile");
    }
    return 0;
  }

  return (
    <View style={styles.container}>
        <HeaderReact />
        {!tipo ? 
            <>
                <Text>{nombre}</Text>
                <Text>{email}</Text>
                <ScoreList filter={email} />
                <Pressable onPress={() => {setTipo(true)}}>
                    <Text>Editar</Text>
                </Pressable>
            </>
            :
            <>
                <Pressable onPress={() => {setTipo(false)}}>
                    <Text>Cancelar</Text>
                </Pressable>
                {googleuser ?
                    <View>
                        <TextInput
                            placeholder="Nombre"
                            onChangeText={setNewNombre}
                            value={newnombre}
                        />
                        <Pressable onPress={() => {
                            let form = new FormData();
                            form.append('nombre', newnombre);
                            saveChanges(form);
                        }}>
                            <Text>Guardar</Text>
                        </Pressable>
                    </View>
                    :
                    <FormularioIngreso sendData={saveChanges} inputData={formdata} tipo={2}/>
                }
                
            </>
        }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
