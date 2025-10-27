import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';

export default function HeaderReact()
{
    const router = useRouter();
    const [mail, setMail] = useState('');
    const [admin, setAdmin] = useState(false);

    useEffect(() => {
        if(Platform.OS == 'web')
        {
            setMail(localStorage.getItem('email') || '');
            setAdmin(localStorage.getItem('isAdmin') == 'true');
        }
        else
        {
            (async() => {
                setMail(await SecureStore.getItemAsync('email') as any || '');
                setAdmin(await SecureStore.getItemAsync('isAdmin') == 'true');
            })();
        }
    })

    async function cerrarSesion()
      {
        if(Platform.OS === 'web') localStorage.clear();
        else
        {
          await SecureStore.deleteItemAsync('email');
          await SecureStore.deleteItemAsync('isAdmin');
          await SecureStore.deleteItemAsync('isGoogleUser');
        }
    
        setAdmin(false);
        setMail('');
        router.push("/");
      }

    if(mail != '')
    {
        return(
            <View>
                <Pressable onPress={() => {router.push("/");}}>
                    <Text>Inicio</Text>
                </Pressable>
                <Pressable onPress={() => {router.push("/profile");}}>
                    <Text>Mi Perfil</Text>
                </Pressable>
                {admin == true ? 
                    <Pressable onPress={() => {router.push("/adminpanel");}}>
                        <Text>Panel de Admin</Text>
                    </Pressable>
                : null}
                <Pressable onPress={() => {
                    cerrarSesion();
                }}>
                    <Text>Cerrar Sesion</Text>
                </Pressable>
            </View>
        );
    }
    else return null;
}