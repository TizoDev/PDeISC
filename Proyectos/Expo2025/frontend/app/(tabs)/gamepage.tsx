import { Platform, StyleSheet } from 'react-native';

import { View, Text, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import GameCanvas from '@/components/GameCanvas';

export default function GamePage() 
{
  return (
    <View style={styles.container}>
      <GameCanvas />
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
