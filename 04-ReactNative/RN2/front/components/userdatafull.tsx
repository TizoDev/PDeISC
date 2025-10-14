import CameraReact from '@/components/camera';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function UserDataFull({ sendData, inputData }:{sendData: (data: FormData) => Promise<number>, inputData: FormData})
{
    const [showCamera, setShowCamera] = useState(false);
    
    const [error, setError] = useState('');
    
    const [nombre, setNombre] = useState(inputData.get('nombre') as any || '');
    const [mail, setMail] = useState(inputData.get('mail') as any || '');
    const [password, setPassword] = useState('');
    const [oldpassword, setOldpassowrd] = useState('')
    const [telefono, setTelefono] = useState(inputData.get('telefono') as any || '');
    const [direccion, setDireccion] = useState(inputData.get('direccion') as any || '');
    const [imageurl, setImageurl] = useState(inputData.get('image') as any || '');

    const register = inputData.get('nombre')==null;
    const isGoogleUser = inputData.get('isGoogleUser') == 'true';

    function validar()
    {
        setError('');
        let valido = true;
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        let telRegex = /^(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/;
        let textRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s']+$/;
        if(!emailRegex.test(mail) && !isGoogleUser)
        {
            valido = false;
            setError('Email Invalido');
        }
        if(!register && !isGoogleUser && (oldpassword.length < 6 || oldpassword.length > 24))
        {
            valido = false;
            setError('Contraseña debe ser de al entre 6 y 24 caracteres');
        }
        if(!isGoogleUser && (password.length < 6 || password.length > 24))
        {
            valido = false;
            setError('Contraseña debe ser de al entre 6 y 24 caracteres');
        }
        if(!textRegex.test(nombre) || nombre.length < 3)
        {
            valido = false;
            setError('Usuario Invalido');
        }
        if(!telRegex.test(telefono))
        {
            valido = false;
            setError('Telefono Invalido');
        }
        if(direccion.length < 6)
        {
            valido = false;
            setError('Direccion Invalida (Minimo 6 caracteres)');
        }
        if(imageurl.length < 1)
        {
            valido = false;
            setError('Ingresar Foto de Perfil');
        }
        return valido;
    }

    async function pickimage()
    {
        if(Platform.OS !== 'web') 
        {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status !== 'granted') return;
        }
    
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, 
            aspect: [4, 4], 
            quality: 1, 
            base64: true,
        });
    
        if(!result.canceled) 
        {
            const base64Img = `data:image/jpeg;base64,${result.assets[0].base64}`;
            setImageurl(base64Img);
        }
    }
    
    function savePhoto(uri: React.SetStateAction<string>)
    {
        setImageurl(uri);
        setShowCamera(false);
    }

    async function send()
    {
        if(!validar()) return;
        const formData = new FormData();
        formData.append('image', imageurl);
        formData.append('nombre', nombre);
        if(isGoogleUser) formData.append('password', password);
        formData.append('mail', mail);
        formData.append('telefono', telefono);
        formData.append('direccion', direccion);
        if(!register) formData.append('oldpassword', oldpassword);

        const respuesta = await sendData(formData);
        if(respuesta == 0) return;
        else if(respuesta == 1) setError('Nombre de usuario ocupado');
        else if(respuesta == 2) setError('Mail ocupado');
        else if(respuesta == 3) setError('Contraseña Incorrecta');
        else setError('Error en el Registro, intentar de nuevo');
    }

    return(
        <>
            {showCamera ? (
                <CameraReact onPicture={savePhoto} setShowCamera={setShowCamera}/>
            ) : (
                Platform.OS === 'web' ? (
                    <View style={styles.bigcontainer}>
                        <View style={{flexDirection: 'row', flex: 1}}>
                            <View style={styles.containercentrado}>
                                <Text style={styles.titulo}>{register ? 'Registro' : 'Edicion'}</Text>
                                <TextInput style={styles.input} placeholder="Nombre" onChangeText={setNombre} value={nombre}/>
                                {!isGoogleUser ? <TextInput style={styles.input} placeholder="Email" onChangeText={setMail} value={mail}/> : <></>}
                                <TextInput style={styles.input} placeholder="Telefono" onChangeText={setTelefono} value={telefono}/>
                                <TextInput style={styles.input} placeholder="Direccion" onChangeText={setDireccion} value={direccion}/>
                                {!register && !isGoogleUser ? <TextInput style={styles.input} placeholder="Contraseña Antigua" secureTextEntry={true} onChangeText={setOldpassowrd} value={oldpassword}/> : <></>}
                                {!isGoogleUser ? <TextInput style={styles.input} placeholder={register ? "Contraseña (6-24 Caracteres)" : "Contraseña Nueva"} secureTextEntry={true} onChangeText={setPassword} value={password}/> : <></>}
                            </View>
                            <View style={styles.containercentrado}>
                                <Text style={styles.subtitulo}>Foto de Perfil</Text>
                                <Pressable onPress={pickimage} style={styles.botonmin}>
                                    <Text style={styles.subtitulo}>Galeria</Text>
                                </Pressable>
                                <Pressable onPress={() => setShowCamera(true)} style={styles.botonmin}>
                                  <Text style={styles.subtitulo}>Camara</Text>
                                </Pressable>
                                {imageurl && (
                                  <Image source={{ uri: imageurl }} style={styles.imagen} />
                                )}
                            </View>
                        </View>
                        <Pressable onPress={send} style={styles.boton}>
                            <Text style={styles.subtitulo}>{register ? 'Registrarse' : 'Guardar'}</Text>
                        </Pressable>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                ) : (
                    <View style={styles.container}>
                        <View style={styles.containercentrado}>
                            <Text style={styles.titulo}>{register ? 'Registro' : 'Edicion'}</Text>
                            <TextInput style={styles.input} placeholder="Nombre" onChangeText={setNombre} />
                            {!isGoogleUser ? <TextInput style={styles.input} placeholder="Email" onChangeText={setMail} value={mail}/> : <></>}
                            <TextInput style={styles.input} placeholder="Telefono" onChangeText={setTelefono} />
                            <TextInput style={styles.input} placeholder="Direccion" onChangeText={setDireccion} />
                            {!register && !isGoogleUser ? <TextInput style={styles.input} placeholder="Contraseña Antigua" secureTextEntry={true} onChangeText={setOldpassowrd} value={oldpassword}/> : <></>}
                            {!isGoogleUser ? <TextInput style={styles.input} placeholder={register ? "Contraseña (6-24 Caracteres)" : "Contraseña Nueva"} secureTextEntry={true} onChangeText={setPassword} value={password}/> : <></>}
                            <Text style={styles.subtitulo}>Foto de Perfil</Text>
                            <Pressable onPress={pickimage} style={styles.botonmin}>
                                <Text style={styles.subtitulo}>Galeria</Text>
                            </Pressable>
                            <Pressable onPress={() => setShowCamera(true)} style={styles.botonmin}>
                                <Text style={styles.subtitulo}>Camara</Text>
                            </Pressable>
                            {imageurl && (
                                <Image source={{ uri: imageurl }} style={styles.imagen} />
                            )}
                        </View>
                        <Pressable onPress={send} style={styles.boton}>
                            <Text style={styles.subtitulo}>{register ? 'Registrarse' : 'Guardar'}</Text>
                        </Pressable>
                        <Text style={styles.error}>{error}</Text>
                    </View>
                )
            )}
        </>
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
  containercentrado:{
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  bigcontainer: {
    top:40,
    marginTop: 20,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f74ca',
    width: 650,
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
  botonmin:{
    backgroundColor: '#4f94ca',
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
    width: 125,
  },
  imagen: {
    borderRadius: 10,
    width: 200, 
    height: 200, 
  }
});
