import { Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Switch, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { GoogleSignin, GoogleSigninButton, isSuccessResponse } from '@react-native-google-signin/google-signin';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { serverurl } from '@/gameLogic/urls'
import FormularioIngreso from '@/components/Formulario';

WebBrowser.maybeCompleteAuthSession();

export default function Login() 
{
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: "204903815937-mphcir1er2shc5125248ffvanr66r8dr.apps.googleusercontent.com",
        });
    }, []);

    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: '204903815937-mphcir1er2shc5125248ffvanr66r8dr.apps.googleusercontent.com',
        androidClientId: '204903815937-5c328ksptho9qjdog9v5mepb26g6l04d.apps.googleusercontent.com'
    });

    const router = useRouter();
    const [tipo, setTipo] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function saveUsuario(altemail : string, admin : boolean, google : boolean)
    {
        if(Platform.OS === 'web')
        {
            localStorage.setItem('email', altemail);
            localStorage.setItem('isAdmin', admin + '');
            localStorage.setItem('isGoogleUser', google + '');
        }
        else
        {
            await SecureStore.setItemAsync('email', altemail);
            await SecureStore.setItemAsync('isAdmin', admin + '');
            await SecureStore.setItemAsync('isGoogleUser', google + '');
        }
    }

    async function handleGoogleSignIn() 
    {
        try 
        {
            setIsSubmitting(true);
            if(Platform.OS === 'web') 
            {
                const result = await promptAsync();
                if(result?.type === 'success') 
                {
                    const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                        headers: { Authorization: `Bearer ${result.authentication?.accessToken}` },
                    });
                    const userInfo = await userInfoResponse.json();
                    await processUser(userInfo.email, userInfo.name);
                }
            }     
            else 
            {
                await GoogleSignin.hasPlayServices();
                const response = await GoogleSignin.signIn();
                if(isSuccessResponse(response)) 
                {
                    const { user } = response.data;
                    await processUser(user.email, user.name);
                }
            }
            setIsSubmitting(false);
        } 
        catch(error) 
        {
            console.error(error);
            setIsSubmitting(false);
        }
    }

    async function processUser(email: string, name: string | null) 
    {
        const nombreFinal = name ?? email.split('@')[0].replace(/[^a-zA-Z]/g, '');

        let res = await fetch(serverurl + 'login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                nombre: nombreFinal, 
                email, password: '', 
                isGoogleUser: 'true' }),
        });
        let data = await res.json();

        if(data == false) 
        {
            res = await fetch(serverurl + 'register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    nombre: nombreFinal, 
                    email, password: '', 
                    isGoogleUser: 'true' }),
            });
            data = await res.json();
        }

        await saveUsuario(email, data.admin || false, true);
        router.push('/');
    }

    async function inicioSesion(formdata: FormData)
    {   
        let res = await fetch(serverurl + 'login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: formdata.get('email'), 
                password: formdata.get('password'), 
                isGoogleUser: 'false'}),
        });
        let data = await res.json();
        if(data.loginCorrecto == false)
        {
            return 2;
        }
        else
        {
            await saveUsuario(formdata.get('email') as any, data.admin, false);
            router.push("/");
        }
        return 0;
    }

    async function registro(formdata: FormData)
    {    
        let res = await fetch(serverurl + 'register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: formdata.get('nombre'), 
                email: formdata.get('email'), 
                password: formdata.get('password'), 
                isGoogleUser: 'false'}),
        });
        let data = await res.json();
        if(data == 1)
        {
            return 1;
        }
        else
        {
            await saveUsuario(formdata.get('email') as any, false, false);
            router.push("/");
        }

        return 0;
    }

    return (
        <View style={styles.container}> 
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Inicio</Text>
              <Switch
                onValueChange={setTipo}
                value={tipo}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={tipo ? '#f5dd4b' : '#f4f3f4'}
              />
              <Text style={styles.switchLabel}>Registro</Text>
            </View>
            <View>
                {tipo ? 
                    <FormularioIngreso sendData={registro} inputData={new FormData()} tipo={1}/>
                    :
                    <FormularioIngreso sendData={inicioSesion} inputData={new FormData()} tipo={0}/>
                }
                {Platform.OS == 'web' ? 
                    <Pressable onPress={handleGoogleSignIn}>
                        <Text>Acceder con Google</Text>
                    </Pressable>
                : 
                    <GoogleSigninButton
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Light}
                        onPress={handleGoogleSignIn}
                        disabled={isSubmitting}
                    />
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 15,
    marginHorizontal: 10,
  },
});