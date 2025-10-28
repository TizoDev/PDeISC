import { io } from 'socket.io-client';
import { objeto, proyectil, nave } from './objeto';

let socket = null;
let token = '';
let spectator = true;

let sx = 0;
let sy = 0;

let playerSpeed = 4;

let jugadores = [];
let balas = [];
let playerx = 0;
let playery = 0;
let playerpos;

let disparando = false;
let disparoTime = 500;
let disparoCooldown = 5;

let dragging = false;
let joystick = { x: 100, y: 300, radius: 40 };
let stick = { x: joystick.x, y: joystick.y };

let isMobile;

let vidamax = 10;
let vidaactual = 10;
let healthbarwidth = 200;
let healthbardheight = 20;
let inmunitytime = 0;
let inmunity = 5;

let puntuacion = 0;

export function start(spect, mobile)
{
    spectator = spect;
    isMobile = mobile;

    puntuacion = 0;
    vidamax = 10;
    vidaactual = 10;

    socket = io("http://192.168.0.92:3001");
    
    if(!spectator) socket.emit("connectplayer", {});

    socket.on("rejectedconnection", () => {
        spectator = true;
    });

    socket.on("gettoken", ({response}) => {
      token = response;
    });

    socket.on("worldupdate", ({ players, bullets }) => {
        jugadores = [];
        Object.values(players).forEach(element => {
            if(element)
            {
                let jug = new objeto(10, 10, element.x, element.y, element.color, element.direction);
                if(element.token === token)
                {
                    playerx = element.x;
                    playery = element.y;
                    playerpos = jugadores.length; 
                }
                jugadores.push(jug);
            }
        });

        balas = [];
        Object.values(bullets).forEach(element => {
            if(element)
            {
                let bal = new proyectil(5, 5, element.x, element.y, "white", element.player, element.id, element.dir, element.tiempo);
                balas.push(bal);
            }
        });
    });

    socket.on("proupdatedel", ({ id }) => {
      let p = balas.findIndex((pro) => pro.id === id);
      balas.splice(p, 1);
    });

    socket.on("damage", ({ damage, player }) => {
        if(inmunitytime >= inmunity)
        {
            vidaactual -= damage;
            inmunitytime = 0;
        }
        if(vidaactual <= 0) socket.emit("addkill", { player: player });
    })

    socket.on("addscore", ({ score }) => {
        puntuacion+=score;
    })
}

export function update()
{
    if(!spectator)
    {
        socket.emit("playermove", { sx: sx * playerSpeed, sy: sy * playerSpeed });
        disparoTime++;
        inmunitytime++;
        if(disparando) disparar();
    }

    let returnjugadores = [];
    let returnbalas = [];

    jugadores.forEach(element => {
        returnjugadores.push(element.update());
    });

    balas.forEach(element => {
        if(element)
        {
          //element.move(element.direction[0], element.direction[1]);
          returnbalas.push(element.update());
        }
    });

    const joystick = isMobile && !spectator ? drawJoystick() : {
      basex: 0,
      basey: 0,
      radius: 0,
      stickx: 0,
      sticky: 0,
    };
    const healthbar = !spectator ? drawHealthbar() : {
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        color: 'white',
    };
    return {
        muerto: vidaactual <= 0,
        puntuacion: puntuacion,
        jugadores: returnjugadores,
        balas: returnbalas,
        joystick: joystick,
        healthbar: healthbar,
    }
    
}

function drawHealthbar()
{
    let dif = vidaactual/vidamax;
    return {
        width: (dif >= 0 ? dif*healthbarwidth : 0) ,
        height: healthbardheight,
        x: 40,
        y: 20,
        color: (dif >= 0.7 ? 'rgba(40,230,70,0.8)' : dif >= 0.4 ? 'rgba(255, 217, 0, 0.8)' : 'rgba(182, 0, 0, 0.8)')
    };
}

const pressedKeys = new Set();
export function teclas(key, pressed) 
{
    if(pressed) pressedKeys.add(key);
    else pressedKeys.delete(key);

    if(pressedKeys.has("ArrowRight")) sx = 1;
    else if(pressedKeys.has("ArrowLeft")) sx = -1;
    else sx = 0;

    if(pressedKeys.has("ArrowDown")) sy = 1;
    else if(pressedKeys.has("ArrowUp")) sy = -1;
    else sy = 0;

    const length = Math.sqrt(sx * sx + sy * sy);
    if(length !== 0) 
    {
        sx /= length;
        sy /= length;
    }

    if(key === ' ')
    {
        if(!spectator) disparar();
    }
}

function disparar()
{
    if(disparoTime > disparoCooldown)
    {
        const length = Math.sqrt(jugadores[playerpos].direction[0] * jugadores[playerpos].direction[0] + jugadores[playerpos].direction[1] * jugadores[playerpos].direction[1]);
        const normalized = length === 0 ? [0, 0] : [jugadores[playerpos].direction[0] / length, jugadores[playerpos].direction[1] / length];
        if(normalized[0] == 0 && normalized[1] == 0) socket.emit("proyectilspawn", { x: playerx, y: playery, dx: 0, dy: 1 });
        else socket.emit("proyectilspawn", { x: playerx, y: playery, dx: normalized[0], dy: normalized[1] });

        disparoTime = 0;
    }
}

export function disconnect()
{
    socket.disconnect();
}

//Mobile Controls
function drawJoystick()
{
    return {
        basex: joystick.x,
        basey: joystick.y,
        radius: joystick.radius,
        stickx: stick.x,
        sticky: stick.y,
    }
};

let activePointerId = null;

export function handleTouchStart(locationx, locationy, pointerId)
{
    if(!isMobile) return;
      
    const x = locationx;
    const y = locationy;

    const dx = x - joystick.x;
    const dy = y - joystick.y;
    if(Math.sqrt(dx * dx + dy * dy) < joystick.radius + 20) 
    {
        dragging = true;
        activePointerId = pointerId;
    }
};

export function handleTouchMove(locationx, locationy, pointerId)
{
    if(!isMobile) return;
    if(!dragging || pointerId !== activePointerId)
    {
        disparando = true;
        return;
    } 

    const x = locationx;
    const y = locationy;

    let dx = x - joystick.x;
    let dy = y - joystick.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Limitar el stick dentro del radio
    if(distance > joystick.radius) 
    {
        dx = (dx / distance) * joystick.radius;
        dy = (dy / distance) * joystick.radius;
    }

    stick = { x: joystick.x + dx, y: joystick.y + dy };
    sx = dx / joystick.radius;
    sy = dy / joystick.radius;
};

export function handleTouchEnd(pointerId)
{
    if(!isMobile) return;
    if(pointerId !== activePointerId)
    {
        disparando = false;
        return;
    }

    dragging = false;
    activePointerId = null;
    stick = { x: joystick.x, y: joystick.y };
    sx = 0;
    sy = 0;
};
