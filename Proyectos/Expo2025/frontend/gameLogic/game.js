import { io } from 'socket.io-client';
import { objeto, proyectil, nave } from './objeto';

let socket = null;
let token = '';

let sx = 0;
let sy = 0;

let width = 300;
let height = 300;

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

export function start(w, h, mobile)
{
    width = w;
    height = h;
    isMobile = mobile;

    socket = io("http://192.168.0.92:3001");

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
}

export function update()
{
    socket.emit("playermove", { sx: sx * playerSpeed, sy: sy * playerSpeed });
    disparoTime++;
    if(disparando) disparar();

    let returnjugadores = [];
    let returnbalas = [];

    jugadores.forEach(element => {
        returnjugadores.push(element.update());
    });

    balas.forEach(element => {
        if(element)
        {
          //if(element.player != token) if(element.colisiona(playerObject)) socket.emit("proyectildelete", { id: element.id });

          element.move(element.direction[0], element.direction[1]);
          returnbalas.push(element.update());
        }
    });

    const joystick = isMobile ? drawJoystick() : {basex: 0,
      basey: 0,
      radius: 0,
      stickx: 0,
      sticky: 0,};
    return {
        jugadores: returnjugadores,
        balas: returnbalas,
        joystick: joystick
    }
    
}

export function teclas(key, pressed) 
{
    if(key === "ArrowRight") sx = pressed ? 1 : 0;
    if(key === "ArrowLeft") sx = pressed ? -1 : 0;
    if(key === "ArrowDown") sy = pressed ? 1 : 0;
    if(key === "ArrowUp") sy = pressed ? -1 : 0;

    if(key === ' ') disparar();
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
