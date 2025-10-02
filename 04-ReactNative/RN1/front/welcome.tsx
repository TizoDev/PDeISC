import { Link, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const { nombre } = useLocalSearchParams();
  return (
    <View style={styles.screen}> 
      <View style={styles.container}>
        <Text style={styles.titulo}>Hola {nombre}</Text>
        <Link href='/' style={styles.boton}>
            <Text style={styles.subtitulo}>Volver al Inicio de sesion</Text>
        </Link>
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
  container: {
    top:200,
    marginTop: 40,
    textAlign: 'center',
    justifyContent: 'center',
    backgroundColor: '#3f74ca',
    width: 350,
    minHeight: '15%',
    borderRadius: 5,
    alignItems: 'center', 
  },
  titulo:{
    textAlign: 'center',
    fontSize: 20,
  },
  subtitulo:{
    textAlign: 'left',
    fontSize: 15,
  },
  input:{
    backgroundColor: 'white',
    width: 300,
    height: 40,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  boton:{
    backgroundColor: '#4f94ca',
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,
  },
});
