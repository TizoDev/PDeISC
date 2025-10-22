import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HeaderReact()
{
    const router = useRouter();
    const [mail, setMail] = useState('');
    const [tipousuario, setTipoUsuario] = useState('');
    const [idusuario, setidusuario] = useState(2);
    
      useEffect(() => {
        (async() => {
          setMail(await SecureStore.getItemAsync('email') as any || '');
          setTipoUsuario(await SecureStore.getItemAsync('tipousuario') || '0');
          setidusuario(Number(await SecureStore.getItemAsync('id_tablausuario')) || 2);
        })();
      })

    return(
      <View style={styles.container}>
      <Pressable style={styles.enlace} onPress={() => { router.push("/"); }}>
        <Text style={styles.texto}>Inicio</Text>
      </Pressable>

      {tipousuario != '0' && tipousuario != '' ? (
        <Pressable style={styles.enlace} onPress={() => { router.push({
            pathname: "/profile",
            params: { id: idusuario, tipo: tipousuario },}); }}>
          <Text style={styles.texto}>Perfil</Text>
        </Pressable>
      ) : null}

      {tipousuario == '2' ? (
        <Pressable style={styles.enlace} onPress={() => { router.push("/equipo"); }}>
          <Text style={styles.texto}>Crear Equipo</Text>
        </Pressable>
      ) : null}

      {tipousuario == '3' ? (
        <Pressable style={styles.enlace} onPress={() => { router.push("/partido"); }}>
          <Text style={styles.texto}>Crear Partido</Text>
        </Pressable>
      ) : null}

      {mail != '' ? (
        <Pressable
          style={[styles.enlace, styles.logout]}
          onPress={async () => {
            await SecureStore.setItemAsync('email', '');
            await SecureStore.setItemAsync('idusuario', '');
            await SecureStore.setItemAsync('tipousuario', '');
            await SecureStore.setItemAsync('id_tablausuario', '');
            router.push("/");
          }}>
          <Text style={styles.texto}>Cerrar Sesión</Text>
        </Pressable>
      ) : (
        <Pressable style={styles.enlace} onPress={() => { router.push("/sesion"); }}>
          <Text style={styles.texto}>Iniciar Sesión</Text>
        </Pressable>
      )}
    </View>
    );
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderBottomColor: '#E53935',
    borderBottomWidth: 2,
    flexWrap: 'wrap',
  },
  enlace: {
    marginHorizontal: 10,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    elevation: 2,
  },
  texto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  logout: {
    backgroundColor: '#E53935',
  },
});