import { Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Switch, TextInput } from 'react-native';

export default function FormularioIngreso({ sendData, inputData, tipo }:{ sendData: (data: FormData) => Promise<Number>, inputData: FormData, tipo: number})
{
    const [nombre, setNombre] = useState(inputData.get('nombre') as any || '');
    const [email, setEmail] = useState(inputData.get('email') as any || '');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [newemail, setNewEmail] = useState('');

    const [error, setError] = useState('');

    function validar()
    {
        setError('');
        let valido = true;
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        let textRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s']+$/;
        if(!emailRegex.test(email))
        {
            valido = false;
            setError('Email Invalido');
        }
        if(tipo==2 && !emailRegex.test(newemail))
        {
            valido = false;
            setError('Nuevo Email Invalido');
        }
        if(password.length < 6 || password.length > 24)
        {
            valido = false;
            setError('La Contraseña debe ser de entre 6 y 24 caracteres');
        }
        if(tipo!=0 && (!textRegex.test(nombre) || nombre.length < 3))
        {
            valido = false;
            setError('Nombre Invalida');
        }
        if(tipo==1)
        {
            if(confirmpassword != password)
            {
                valido = false;
                setError('Contraseñas no Concuerdan');
            }
        }
        else if(tipo==2)
        {
            if(confirmpassword.length < 6 || confirmpassword.length > 24)
            {
                valido = false;
                setError('La Contraseña Nueva debe ser de entre 6 y 24 caracteres');
            }
        }
        return valido;
    }

    async function validarenviar() 
    {
        if(!validar()) return;

        let datosForm = new FormData();
        datosForm.append('email', email);
        datosForm.append('password', password);
        if(tipo!=0) datosForm.append('nombre', nombre);
        if(tipo==2) datosForm.append('newpassword', confirmpassword);
        if(tipo==2) datosForm.append('newemail', newemail);

        const respuesta = await sendData(datosForm);
        if(respuesta == 1) setError('Email Ocupado');
        else if(respuesta == 2) setError('Usuario Inexistente');
        else if(respuesta == 4) setError('Contraseña Incorrecta');
    }

    return(
        <View>
            <Text> {tipo==2 ? 'Editar' : (tipo==1 ? 'Registro' : 'Inicio de Sesión')} </Text>
                {tipo!=0 ? <TextInput
                    placeholder="Nombre"
                    onChangeText={setNombre}
                    value={nombre}
                /> : null}
                <TextInput
                    placeholder="Email"
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    value={email}
                />
                {tipo==2 ? 
                    <TextInput
                        placeholder="Nuevo Email"
                        onChangeText={setNewEmail}
                        autoCapitalize="none"
                    /> : null}
                <TextInput
                    placeholder={tipo==2 ? "Contraseña Antigua" : "Contraseña"}
                    secureTextEntry
                    onChangeText={setPassword}
                    autoCapitalize="none"
                />
                {tipo!=0 ? <TextInput
                    placeholder={tipo==2 ? "Contraseña Nueva" : "Confirmar Contraseña"}
                    secureTextEntry
                    onChangeText={setConfirmPassword}
                    autoCapitalize="none"
                /> : null}
                <Pressable
                    onPress={validarenviar}>
                    <Text>
                        {tipo==2 ? 'Guardar' : (tipo==1 ? 'Registrarse' : 'Iniciar Sesión')}
                    </Text>
                </Pressable>
              {error !== '' && <Text>{error}</Text>}
        </View>
    );
}