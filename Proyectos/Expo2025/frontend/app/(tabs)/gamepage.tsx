import { Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GameCanvas from '@/components/GameCanvas';
import * as SecureStore from 'expo-secure-store';
import { serverurl } from '@/gameLogic/urls'

export default function GamePage() 
{
  const router = useRouter();
  let email = '';
  
  useEffect(() => {
    (async () => {
      let savedMail;
        if(Platform.OS === 'web') savedMail = localStorage.getItem('email');
        else savedMail = await SecureStore.getItemAsync('email');
  
        email = savedMail || '';
    })();
  }, []);
  
  async function guardarScore(score : number)
  {
    if(score > 0)
    {
      await fetch(serverurl + 'addScore', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, newScore: score }),
      });
    }
  }

  function gameOver()
  {
    router.push("/gamepage");
  }

  return (
    <View style={styles.container}>
      <GameCanvas onGameOver={gameOver} saveScore={guardarScore}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
