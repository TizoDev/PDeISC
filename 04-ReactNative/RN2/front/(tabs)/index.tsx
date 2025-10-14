import UserData from '@/components/userdata';
import UserDataFull from '@/components/userdatafull';
import * as AuthSession from 'expo-auth-session';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, Platform, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function HomeScreen() 
{
  const [tipo, setTipo] = useState(false);
  const router = useRouter();

  const redirectUri = Platform.OS === 'web'
  ? AuthSession.makeRedirectUri({ useProxy: false } as any)
  : AuthSession.makeRedirectUri({ useProxy: true } as any);
  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    Platform.OS === 'web'
      ? {
          clientId: "204903815937-mphcir1er2shc5125248ffvanr66r8dr",
          redirectUri,
          scopes: ['profile', 'email'],
          responseType: 'token',
          extraParams: { prompt: 'select_account' },
          usePKCE: false,
        }
      : {
          clientId: "204903815937-mphcir1er2shc5125248ffvanr66r8dr",
          redirectUri,
          scopes: ['profile', 'email'],
          responseType: 'id_token', 
          extraParams: { nonce: 'random_string' },
          usePKCE: false,
        },
    { authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth' }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token, access_token } = response.params;
  
      if (id_token || access_token) {
        handleGoogleLogin({ idToken: id_token, accessToken: access_token });
      }
    }
  }, [response]);

  useEffect(() => {
    (async () => {
      if(Platform.OS === 'web')localStorage.clear();
      else await SecureStore.deleteItemAsync('oldmail');
    })();
  }, []);

  async function handleGoogleLogin(tokens:any) 
  {
    try {
      const res = await fetch('http://192.168.0.143:3031/googleLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tokens),
      });
  
      const data = await res.json();
  
      if (data.success) {
        if (Platform.OS === 'web') localStorage.setItem('oldmail', data.mail);
        else await SecureStore.setItemAsync('oldmail', data.mail);
        router.push('/profile');
      } else {
        console.log('Error al iniciar sesión con Google:', data.error);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function inicio(formData: FormData) : Promise<number>
  {
      const response = await fetch('http://192.168.0.143:3031/getUsuario',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          mail: formData.get('mail'),
          password: formData.get('password')
        }),
      });
      const data = await response.json();
      console.log(data);
      if(data == 1)
      {
        if(Platform.OS === 'web') localStorage.setItem('oldmail', formData.get('mail') as string);
        else await SecureStore.setItemAsync('oldmail', formData.get('mail') as string);
        router.push("/profile");
      }
      return data as number;
  }

  async function registro(formData: FormData) : Promise<number>
  {
      const response = await fetch('http://192.168.0.143:3031/addUsuario',{
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if(data == 0)
      {
        await SecureStore.setItemAsync('oldmail', formData.get('mail') as string);
        router.push("/profile");
      }
      return data;
  }
  
  return (
    <View style={styles.screen}>
        <View>
          <View style={styles.containersec}>
            <Text style={styles.subtitulo}>Iniciar Sesion o Registrarse</Text>
            <Switch
              onValueChange={setTipo}
              value={tipo}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={tipo ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
            />
          </View>
          {tipo ? (
            <UserDataFull sendData={registro} inputData={new FormData()} />
          ) : (
            <UserData sendData={inicio} /> 
          )}
          <Pressable onPress={() => promptAsync()} disabled={!request} style={styles.google}>
            <Text style={styles.googletext}>Iniciar Sesion o Registrarse con Google</Text>
            <Image
              style={styles.googleimagen}
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png' }}
            />
          </ Pressable>
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
  containersec: {
    top:50,
    alignItems: 'center',
  },
  subtitulo:{
    color: "white",
    fontSize: 15,
    textAlign: 'center',
  },
  google:{
    top: 100,
    justifyContent: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 40,
    borderRadius: 10,
  },
  googletext:{
    marginTop: 10,
    paddingHorizontal: 10,
  },
  googleimagen:{
    marginTop: 10,
    width: 20,
    height: 20,
  },
});
