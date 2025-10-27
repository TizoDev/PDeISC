import { Platform, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable  } from 'react-native';
import { useRouter } from 'expo-router';
import ScoreList from '@/components/HighScores';
import * as SecureStore from 'expo-secure-store';
import HeaderReact from '@/components/header';

export default function HomeScreen() 
{
  const router = useRouter();
  const [email, setEmail] = useState('');

  useEffect(() => {
    (async () => {
      let savedMail;
        if(Platform.OS === 'web') savedMail = localStorage.getItem('email');
        else savedMail = await SecureStore.getItemAsync('email');

        setEmail(savedMail || '');
    })();
  }, []);

  function play()
  {
    if(email != '') router.push("/gamepage");
    else
    {
      router.push("/login");
    }
  }

  return (
    <View style={styles.container}>
      <HeaderReact />
      <Text> Core Wars </Text>
      <Pressable onPress={play}>
        <Text>Jugar</Text>
      </Pressable>
      <ScoreList filter=''/>
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
