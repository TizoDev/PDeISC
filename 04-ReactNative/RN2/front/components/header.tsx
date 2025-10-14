import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HeaderReact()
{
    const router = useRouter();

    return(
        <View style={styles.container}>
            <Pressable style={styles.enlace} onPress={() => {router.push("/profile");}}>
                <Text style={styles.texto}>Perfil</Text>
            </Pressable>
            <Pressable style={styles.enlace} onPress={() => {router.push("/userlist");}}>
                <Text style={styles.texto}>Usuarios</Text>
            </Pressable>
            <Pressable style={styles.enlace} onPress={() => {router.push("/");}}>
                <Text style={styles.texto}>Cerrar Sesion</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      top:0,
      paddingTop:40,
      flexDirection: 'row',
      textAlign: 'center',
      justifyContent: 'center',
      backgroundColor: '#3f74ca',
      width: '100%',
      minHeight: 60,
      borderRadius: 0,
      alignItems: 'center', 
    },
    titulo:{
      textAlign: 'center',
      fontSize: 20,
    },
    subtitulo:{
      fontSize: 15,
      textAlign: 'center',
    },
    enlace:{
        marginLeft: 5,
        marginRight: 5,
        padding: 10,
    },
    texto: {
        width: 120,
        textAlign: 'center',
        fontSize: 20,
    },
});
  