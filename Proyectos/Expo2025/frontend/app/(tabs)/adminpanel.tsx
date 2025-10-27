import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Platform } from 'react-native';

export default function AdminPanel()
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

        if(!admin) router.push("/");
    }, [])

    return(
        <View style={styles.container}>
            
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
