import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function UserData({ sendData }:{sendData: (data: FormData) => Promise<number>})
{
    const [error, setError] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    function validar()
    {
        setError('');
        let valido = true;
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        if(!emailRegex.test(mail))
        {
          valido = false;
          setError('Email Invalido');
        }
        if(password.length < 6 || password.length > 24)
        {
          valido = false;
          setError('Contraseña debe ser de al entre 6 y 24 caracteres');
        }
        return valido;
    }  

    async function send()
    {
        if(!validar()) return;
        const formData = new FormData();
        formData.append('password', password);
        formData.append('mail', mail);

        const respuesta = await sendData(formData);
        if(respuesta == 1) return;
        else setError('Usuario no Existente');
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titulo}>Inicio de Sesion</Text>
            <TextInput style={styles.input} placeholder="Email" onChangeText={setMail} />
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} onChangeText={setPassword} />
            <Pressable onPress={send} style={styles.boton}>
                <Text style={styles.subtitulo}>Iniciar Sesion</Text>
            </Pressable>
            <Text style={styles.error}>{error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    top:80,
    marginTop: 20,
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
    color: "white",
    fontSize: 15,
    textAlign: 'center',
  },
  error:{
    textAlign: 'left',
    fontSize: 15,
    color: '#d9262f',
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
    color: 'black',
  },
  boton:{
    backgroundColor: '#4f94ca',
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    width: 200,
  },
});
