import HeaderReact from '@/components/header';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function HomeScreen() 
{
  const router = useRouter();
  const [mail, setMail] = useState('');
  const [jugadores, setJugadores] = useState<any[]>([]);
  const [directores, setDirectores] = useState<any[]>([]);
  const [equipos, setEquipos] = useState<any[]>([]);

  useEffect(() => {
    (async() => {
      setMail(await SecureStore.getItemAsync('email') as any || '');
    })();
    fetch('http://192.168.0.143:3031/getJugadores')
      .then(response => response.json())
      .then(data => setJugadores(data));
    fetch('http://192.168.0.143:3031/getDirectores')
      .then(response => response.json())
      .then(data => setDirectores(data));
    fetch('http://192.168.0.143:3031/getEquipos')
      .then(response => response.json())
      .then(data => setEquipos(data));
  }, [])

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <HeaderReact />

      <Text style={styles.sectionTitle}>Jugadores</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {jugadores.map((item) => (
          <View style={styles.card} key={item.id}>
            <Image
              style={styles.imagen}
              source={{ uri: 'http://192.168.0.143:3031' + item.imagen }}
            />
            <Text style={styles.nombre}>{item.nombre} {item.apellido}</Text>
            <Pressable
              style={styles.boton}
              onPress={() => {
                router.push({
                  pathname: "/profile",
                  params: { id: item.id, tipo: 1 },
                });
              }}>
              <Text style={styles.botonTexto}>Más información</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Directores Técnicos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {directores.map((item) => (
          <View style={styles.card} key={item.id}>
            <Image
              style={styles.imagen}
              source={{ uri: 'http://192.168.0.143:3031' + item.imagen }}
            />
            <Text style={styles.nombre}>{item.nombre} {item.apellido}</Text>
            <Pressable
              style={styles.boton}
              onPress={() => {
                router.push({
                  pathname: "/profile",
                  params: { id: item.id, tipo: 2 },
                });
              }}>
              <Text style={styles.botonTexto}>Más información</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Equipos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carousel}>
        {equipos.map((item) => (
          <View style={styles.card} key={item.id}>
            <Image
              style={styles.imagen}
              source={{ uri: 'http://192.168.0.143:3031' + item.escudo }}
            />
            <Text style={styles.nombre}>{item.nombre}</Text>
            <Pressable
              style={styles.boton}
              onPress={() => {
                router.push({
                  pathname: "/profile",
                  params: { id: item.id, tipo: 3 },
                });
              }}>
              <Text style={styles.botonTexto}>Más información</Text>
            </Pressable>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E53935',
    marginBottom: 10,
  },
  carousel: {
    maxHeight: 220,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 8,
    width: 140,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  imagen: {
    borderRadius: 10,
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  nombre: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  boton: {
    backgroundColor: '#E53935',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});