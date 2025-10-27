import React, { useEffect, useRef, useState } from "react";
import { Platform, View, Text, Pressable } from "react-native";
import Controls from "./Controls";
import { useRouter } from 'expo-router';
import { start, teclas, handleTouchStart, handleTouchMove, handleTouchEnd, update, disconnect } from '@/gameLogic/game';
import { Canvas, Circle, Rect, Paint, Group, center } from '@shopify/react-native-skia';

export default function GameCanvas({ onGameOver, saveScore }:{ onGameOver:() => void, saveScore: (score : number) => void}) 
{
  const canvaswidth = 900;
  const canvasheight = 400;
  const webCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [gameValues, setGameValues] = useState<{
    muerto: boolean;
    puntuacion: number;
    jugadores: any[];
    balas: any[];
    joystick: {
      basex: any;
      basey: any;
      radius: any;
      stickx: any;
      sticky: any;
    };
    healthbar: {
      width: any;
      height: any;
      x: any;
      y: any;
      color: any;
    };
  }>({
    muerto: false,
    puntuacion: 0,
    jugadores: [],
    balas: [],
    joystick: {
      basex: 0,
      basey: 0,
      radius: 0,
      stickx: 0,
      sticky: 0,
    },
    healthbar: {
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      color: 'white',
    }
  });

  useEffect(() => {
    start(canvaswidth, canvasheight, !(Platform.OS === "web"));
    if(Platform.OS === "web" && webCanvasRef.current) 
    {
      const canvas = webCanvasRef.current;

      canvas.width = canvaswidth;
      canvas.height = canvasheight;
    }
    const interval = setInterval(() => {
      let newValues = update();
      setGameValues(newValues);

      if(newValues.muerto)
      {
        saveScore(newValues.puntuacion);
        clearInterval(interval);
        disconnect();
      }

      if(Platform.OS === "web" && webCanvasRef.current) 
      {
        const canvas = webCanvasRef.current;
        const ctx = canvas.getContext("2d");
        
        if(ctx != null) ctx.clearRect(0, 0, canvaswidth, canvasheight);

        if(ctx != null) newValues.jugadores.map((jugador) => {
          ctx.save();
          ctx.translate(jugador.x + jugador.width/2, jugador.y + jugador.height/2);
          ctx.rotate(jugador.rotation);
          ctx.fillStyle = 'white';
          ctx.fillRect(-jugador.width/2, -jugador.height/2, jugador.width, jugador.height);
          ctx.restore();
        })

        if(ctx != null) newValues.balas.map((bala) => {
          ctx.save();
          ctx.translate(bala.x + bala.width/2, bala.y + bala.height/2);
          ctx.rotate(bala.rotation);
          ctx.fillStyle = 'yellow';
          ctx.fillRect(-bala.width/2, -bala.height/2, bala.width, bala.height);
          ctx.restore();
        })

        if(ctx != null)
        {
          ctx.fillStyle = newValues.healthbar.color;
          ctx.fillRect(newValues.healthbar.x, newValues.healthbar.y, newValues.healthbar.width, newValues.healthbar.height);
        }
      }
    }, 50);

    return () => {
      saveScore(gameValues.puntuacion);
      clearInterval(interval);
      disconnect();
    };
  }, []);

  function deathScreen()
  {
    const router = useRouter();
    return(
      <View style={{position: "absolute"}}>
        <Text style={{color: 'white', textAlign: 'center'}}>Te moriste jajaja nuv</Text>
        <Text style={{color: 'white', textAlign: 'center'}}>Puntuacion: {gameValues.puntuacion}</Text>
        <Pressable onPress={onGameOver}>
          <Text style={{color: 'white', textAlign: 'center'}}>Jugar de Nuevo</Text>
        </Pressable>
        <Pressable onPress={() => {
          router.push("/");
        }}>
          <Text style={{color: 'white', textAlign: 'center'}}>Ir al Inicio</Text>
        </Pressable>
      </View> 
    )
  }

  if (Platform.OS === "web") 
  {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <canvas
          ref={webCanvasRef}
          style={{backgroundColor: "#000000ff" }}
        />
        <Controls onKey={(key, pressed) => teclas(key, pressed)} />
        {gameValues.muerto ? 
          deathScreen()
      : null}
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      onTouchStart={(e) => {
        for(const touch of e.nativeEvent.touches) 
        {
          handleTouchStart(touch.locationX, touch.locationY, touch.identifier);
        }
      }}
      onTouchMove={(e) => {
        for(const touch of e.nativeEvent.touches) 
        {
          handleTouchMove(touch.locationX, touch.locationY, touch.identifier);
        }
      }}
      onTouchEnd={(e) => {
        for(const touch of e.nativeEvent.changedTouches) 
        {
          handleTouchEnd(touch.identifier);
        }
      }}
    >
      <Canvas 
        style={{ width: canvaswidth, height: canvasheight, backgroundColor: "black" }}
      >
        <Group>
          {gameValues.jugadores.map((jugador, index) => {
            return(
            <Group
              key={index}
              transform={[
                { translateX: jugador.x + jugador.width / 2 },
                { translateY: jugador.y + jugador.height / 2 },
                { rotate: jugador.rotation },
                { translateX: -jugador.width / 2 },
                { translateY: -jugador.height / 2 },
              ]}>
              <Rect width={jugador.width} height={jugador.height} color="white" >
                <Paint color="white" />
              </Rect>
            </Group>
            );
          })}
          {gameValues.balas.map((bala, index) => {
            return(
            <Group
              key={index}
              transform={[
                { translateX: bala.x + bala.width / 2 },
                { translateY: bala.y + bala.height / 2 },
                { rotate: bala.rotation },
                { translateX: -bala.width / 2 },
                { translateY: -bala.height / 2 },
              ]}>
              <Rect width={bala.width} height={bala.height} color="yellow" >
                <Paint color="yellow" />
              </Rect>
            </Group>
            );
          })}
        </Group>
        <>
          <Circle
            cx={gameValues.joystick.basex}
            cy={gameValues.joystick.basey}
            r={gameValues.joystick.radius}
            color="rgba(255,255,255,0.3)"
          />
          <Circle
            cx={gameValues.joystick.stickx}
            cy={gameValues.joystick.sticky}
            r={15}
            color="rgba(255,255,255,0.6)"
          />
        </>
        <Group>
          <Rect width={gameValues.healthbar.width} height={gameValues.healthbar.height} color={gameValues.healthbar.color} x={gameValues.healthbar.x} y={gameValues.healthbar.y}>
            <Paint color={gameValues.healthbar.color} />
          </Rect>
        </Group>
      </Canvas>
      <Controls onKey={(key, pressed) => teclas(key, pressed)} />
      {gameValues.muerto ? 
        deathScreen()
      : null}
    </View>
  );
}
