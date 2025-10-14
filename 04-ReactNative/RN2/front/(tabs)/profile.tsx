import HeaderReact from "@/components/header";
import UserDataFull from "@/components/userdatafull";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export default function Profile() {
    const [oldmail, setOldMail] = useState('');

    const [mail, setMail] = useState('');
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [imageurl, setImageurl] = useState('');
    const [isGoogleUser, setGoogle] = useState(false);
    const [formDatausu, setFormDatausu] = useState<FormData | null>(null);

    const [tipo, setTipo] = useState(true);

    useEffect(() => {
      (async () => {
        let savedMail;
        if(Platform.OS === 'web') savedMail = localStorage.getItem('oldmail');
        else savedMail = await SecureStore.getItemAsync('oldmail');
        if (!savedMail) 
        {
          router.replace('/');
          return;
        }
        setOldMail(savedMail);

        fetch('http://192.168.0.143:3031/getData',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mail: savedMail })
        }).then(response => response.json()).then(async data => {
          setNombre(data[0].nombre);
          setTelefono(data[0].telefono);
          setDireccion(data[0].direccion);
          setImageurl(data[0].foto);
          setMail(data[0].mail);
          setGoogle(!!data[0].isGoogleUser);

          const fullImageUrl = 'http://192.168.0.143:3031/' + data[0].foto.replace('./', '');

          try 
          {
            const response = await fetch(fullImageUrl);
            const blob = await response.blob();
            const reader = new FileReader();

            reader.onloadend = () => {
              if(reader.result && typeof reader.result === 'string') 
              {
                const base64data = reader.result.split(',')[1];
                const newForm = new FormData();
                newForm.append('image', `data:image/jpeg;base64,${base64data}`);
                newForm.append('nombre', data[0].nombre);
                newForm.append('mail', data[0].mail);
                newForm.append('telefono', data[0].telefono);
                newForm.append('direccion', data[0].direccion);
                newForm.append('isGoogleUser', !!data[0].isGoogleUser + '');
                console.log('Imagen convertida correctamente a base64');
                setFormDatausu(newForm);
              }
            };
            reader.readAsDataURL(blob);
            } catch (error) {
              console.error('Error convirtiendo imagen a base64:', error);
            }
        });
      })();
    }, []);

    const router = useRouter();
    async function editProfile(formData : FormData) : Promise<number>
    {
      formData.append('oldmail', oldmail as string);
      formData.append('isGoogleUser', isGoogleUser + '');
      const response = await fetch('http://192.168.0.143:3031/editUsuario',{
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if(data == 0)
      {
        router.push({
        pathname: "/profile",
          params: { oldmail: formData.get('mail') as any},
        });
      }
      return data as number;
    }

    return (
        <View style={styles.screen}> 
          <HeaderReact />
          {tipo ? (
            <View style={styles.container}>
              <Text style={styles.titulo}>{nombre || 'Nombre'}</Text>
              <Text style={styles.subtitulo}>{mail || 'Mail'}</Text>
              <Text style={styles.subtitulo}>{telefono || 'Telefono'}</Text>
              <Text style={styles.subtitulo}>{direccion || 'Direccion'}</Text>
              <Image
                style={styles.imagen}
                source={{ uri: 'http://192.168.0.143:3031/' + imageurl.replace('./', '') }}
              />
            </View>
          ) : (
            <UserDataFull sendData={editProfile} inputData={formDatausu as FormData}/>
          )}
          <Pressable onPress={() => {setTipo(tipo ? false : true)}} style={styles.botonespecial}>
            <Text style={styles.subtitulo}>{tipo ? 'Editar' : 'Volver'}</Text>
          </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  container: {
    top:40,
    marginTop: 40,
    padding: 20,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f74ca',
    width: 350,
    minHeight: '15%',
    borderRadius: 5,
    alignItems: 'center', 
  },
  titulo:{
    textAlign: 'center',
    fontSize: 20,
  },
  subtitulo:{
    textAlign: 'left',
    fontSize: 15,
  },
  input:{
    backgroundColor: 'white',
    width: 300,
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  boton:{
    backgroundColor: '#4f94ca',
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  botonespecial:{
    top: 50,
    backgroundColor: '#4f94ca',
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  imagen: {
    borderRadius: 10,
    width: 200, 
    height: 200, 
  }
});
