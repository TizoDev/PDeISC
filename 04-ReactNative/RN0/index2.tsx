import { Platform, StyleSheet } from 'react-native';

import { View, Text, Image, TextInput, ScrollView, Button } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen}>
      <Text style={styles.subtitulo}>Componente View</Text>
      <View style={styles.container}></View>

      <Text style={styles.subtitulo}>Componente Text</Text>
      <View style={styles.container}>
        <Text style={styles.textCentrado}>Texto</Text>
      </View>

      <Text style={styles.subtitulo}>Componente Image</Text>
      <View style={styles.container}>
        <Image style={styles.imagen} source={require('../../assets/images/react-logo.png')}/>
      </View>

      <Text style={styles.subtitulo}>Componente TextInput</Text>
      <View style={styles.container}>
        <TextInput style={styles.input}/>
      </View>

      <Text style={styles.subtitulo}>Componente Button</Text>
      <View style={styles.container}>
        <Button style={styles.boton} title='Saludo' onPress={() => alert('Hola!!!!!!!!')}></Button>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    marginTop: 40,
    textAlign: 'center',
    left: '10%',
    justifyContent: 'center',
    backgroundColor: '#3f74ca',
    width: '80%',
    minHeight: '15%',
    borderRadius: 10,
    alignItems: 'center', 
  },
  subtitulo:{
    fontSize: 20,
    left: '10%',
    marginBottom: -30,
  },
  textCentrado:{
    textAlign: 'center',
    fontSize: 20,
  },
  imagen:{
  },
  input:{
    backgroundColor: 'white',
    width: '80%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
  },
  boton:{
  },
});
