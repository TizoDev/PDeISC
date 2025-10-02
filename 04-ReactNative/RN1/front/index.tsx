import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() 
{
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function validar()
  {
    setError('');
    let valido = true;
    let textRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s']+$/;
    if(!textRegex.test(nombre) || nombre.length < 3)
    {
      valido = false;
      setError('Usuario Invalido');
    }
    if(password.length < 6)
    {
      valido = false;
      setError('Contraseña debe ser de al menos 6 caracteres');
    }
    return valido;
  }
  const router = useRouter();
  function inicio()
  {
    if(validar())
    {
      fetch('http://192.168.0.143:3031/getUsuario',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, password })
      }).then(response => response.json()).then(data => {
        console.log(data);
        if(data == 1)
        {
          router.push({
            pathname: "/welcome",
            params: { nombre: nombre },
          });
        }
        else
        {
          setError('Usuario no Existente');
        }
      });
    }
  }

  function registro()
  {
    if(validar())
    {
      fetch('http://192.168.0.143:3031/addUsuario',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, password })
      }).then(response => response.json()).then(data => {
        console.log(data);
        if(data.affectedRows == 1)
        {
          router.push({
            pathname: "/welcome",
            params: { nombre: nombre },
          });
        }
        else
        {
          setError('Error en el Registro, intentar de nuevo');
        }
      });
    }
  }

  return (
    <View style={styles.screen}> 
      <View style={styles.container}>
        <Text style={styles.titulo}>Inicio de Sesion</Text>
        <TextInput style={styles.input} placeholder='Nombre' onChangeText={text => setNombre(text)}/>
        <TextInput style={styles.input} placeholder='Contraseña (6 Caracteres)' secureTextEntry={true} onChangeText={text => setPassword(text)}/>
        <Pressable onPress={inicio} style={styles.boton}>
          <Text style={styles.subtitulo}>Iniciar Sesion</Text>
        </Pressable>
        <Pressable onPress={registro} style={styles.boton}>
          <Text style={styles.subtitulo}>Registrarse</Text>
        </Pressable>
        <Text style={styles.error}>{error}</Text>
      </View>
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
    top:180,
    marginTop: 40,
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
  },
});
