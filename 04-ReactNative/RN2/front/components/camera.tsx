import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CameraReact({ onPicture, setShowCamera }:{onPicture: (uri: string) => void; setShowCamera: (value: boolean) => void;})
{
    const [permission, requestPermission] = useCameraPermissions();
    const [camType, setCameraType] = useState<'front' | 'back'>('front');
    const cameraRef = useRef<CameraView>(null);

    async function takePicture()
    {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            onPicture(photo.uri);
        }
    };

    return(
        permission?.granted ? (
            <View style={Platform.OS !== 'web' ? styles.cameraContainerMobile : styles.cameraContainer}>
                <CameraView
                    style={styles.camera}
                    ref={cameraRef}
                    ratio="1:1"
                    facing={camType}
                />
                <View style={styles.cameraButtons}>
                    <Pressable style={styles.camButton} onPress={() => setCameraType(camType === 'front' ? 'back' : 'front')}>
                        <Text style={styles.subtitulo}>Cambiar cámara</Text>
                    </Pressable>
                    <Pressable style={styles.camButton} onPress={takePicture}>
                        <Text style={styles.subtitulo}>Tomar foto</Text>
                    </Pressable>
                    <Pressable style={styles.camButton} onPress={() => setShowCamera(false)}> 
                        <Text style={styles.subtitulo}>Cancelar</Text>
                    </Pressable>
                </View>
            </View>
            ) : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' }}>Se requiere permiso para usar la cámara</Text>
                <Pressable onPress={requestPermission} style={styles.boton}>
                    <Text style={styles.subtitulo}>Conceder permiso</Text>
                </Pressable>
            </View>
            )
    );
}

const styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        width: 400,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
      },
      cameraContainerMobile: {
        flex: 1,
        width: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
      },
      camera: {
        width: '100%',
        aspectRatio: 1,
      },
      cameraButtons: {
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
      },
      camButton: {
        backgroundColor: '#4f94ca',
        padding: 10,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: 'black',
      },
      boton:{
        backgroundColor: '#4f94ca',
        marginBottom: 5,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5,
        padding: 5,
        width: 200,
      },
      subtitulo:{
        color: "white",
        fontSize: 15,
        textAlign: 'center',
      },
});