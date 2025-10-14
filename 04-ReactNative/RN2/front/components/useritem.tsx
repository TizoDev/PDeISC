import React from 'react';
import { Image, Platform, StyleSheet, Text, View } from 'react-native';

export default function UserItem({userData}:{userData: FormData})
{
    return(
        <View style={Platform.OS === 'web' ? styles.container : styles.containerMobile}>
            <View style={styles.containerparte}>
                <View style={styles.containercentrado}>
                    <Text>{userData.get('nombre') as any}</Text>
                    <Text>{userData.get('mail') as any}</Text>
                    <Text>{userData.get('telefono') as any}</Text>
                    <Text>{userData.get('direccion') as any}</Text>
                </View>
            </View>
            <View style={styles.containerparte}>
                <View style={styles.containercentrado}>
                    <Image
                        style={styles.imagen}
                        source={{ uri: 'http://192.168.0.143:3031/' + userData.get('foto') }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginHorizontal: 25,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f74ca',
    width: 400,
    minHeight: 80,
    borderRadius: 5,
    alignItems: 'center', 
    flexDirection: 'row', 
  },
  containerMobile: {
    marginTop: 20,
    marginHorizontal: 0,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f74ca',
    width: 390,
    minHeight: 80,
    borderRadius: 5,
    alignItems: 'center', 
    flexDirection: 'row', 
  },
  containerparte:{
    flex: 1
  },
  containercentrado:{
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  titulo:{
    textAlign: 'center',
    fontSize: 20,
  },
  subtitulo:{
    textAlign: 'left',
    fontSize: 15,
  },
  boton:{
    backgroundColor: '#4f94ca',
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  botonespecial:{
    top: 50,
    backgroundColor: '#4f94ca',
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
  imagen: {
    borderRadius: 5,
    width: 100, 
    height: 100, 
  }
});