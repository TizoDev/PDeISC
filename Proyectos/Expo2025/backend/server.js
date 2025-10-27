import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectBD } from './conectbd.js';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

let database;
try
{
  database = await connectBD();
}
catch(error)
{
  console.error(error);
}

async function getAllScores()
{
  const sql = 'SELECT usuarios.nombre, usuarios.email, highscores.score FROM highscores JOIN usuarios ON highscores.jugador = usuarios.id ORDER BY highscores.score DESC';
  const [result] = await database.execute(sql);
  return result;
}

async function register(nombre, email, password, isGoogleUser)
{
  let sql = 'SELECT * FROM usuarios WHERE email=?';
  let [r] = await database.execute(sql, [email]);
  if(r.length != 0) return 1;

  if(isGoogleUser)
  {
    sql = 'INSERT INTO usuarios (nombre, email, isGoogleUser) VALUES (?,?,?)'
    await database.execute(sql, [nombre, email, isGoogleUser]);
  }
  else
  {
    const hashedPassword = await bcrypt.hash(password, 10);
    sql = 'INSERT INTO usuarios (nombre, email, password, isGoogleUser) VALUES (?,?,?,?)'
    await database.execute(sql, [nombre, email, hashedPassword, isGoogleUser]);
  }
  return 0;
}

async function login(email, password, isGoogleUser) 
{
  const sql = 'SELECT id, password, admin FROM usuarios WHERE email=?';
  const [result] = await database.execute(sql, [email]);
  
  if(result.length != 0 && !isGoogleUser)
  {
    const match = await bcrypt.compare(password, result[0].password);
    if(match) return result;
  }
  return result;  
}

async function getUserData(email)
{
  const sql = 'SELECT id, nombre, email, admin, isGoogleUser FROM usuarios WHERE email=?';
  const [result] = await database.execute(sql, [email]);

  return result;  
}

async function addScore(email, newScore)
{
  let sql = 'SELECT id FROM usuarios WHERE email=?';
  const [result] = await database.execute(sql, [email]);

  console.log(id, email, newScore);
  sql = 'INSERT INTO highscores (score, jugador) VALUES (?,?)'
  await database.execute(sql, [newScore, id]);
  return 0;
}

async function editUser(mail, password, oldmail, oldpassword, isGoogleUser, nombre)
{
  if(!isGoogleUser)
  {
    const [re2] = await database.execute("SELECT * FROM usuarios WHERE email=? AND email<>?", [mail, oldmail]);
    if(re2.length != 0) return 3;
    let sql = 'SELECT * FROM usuarios WHERE email=?';
    const [result] = await database.execute(sql, [oldmail]);
    if(result.length != 0)
    {
      const match = await bcrypt.compare(oldpassword, result[0].password);
      if(!match)return 4;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    sql = 'UPDATE usuarios SET email=?, password=?, nombre=? WHERE email=?';
    await database.execute(sql, [mail, hashedPassword, nombre, oldmail]);
    return 0;
  }
  else
  {
    let sql = 'UPDATE usuarios SET nombre=? WHERE email=?';
    await database.execute(sql, [nombre, oldmail]);
    return 0;
  }
}

function colisiona(jugador, bala)
{
  let myleft = jugador.x;
  let myright = jugador.x + 10;
  let mytop = jugador.y;
  let mybottom = jugador.y + 10;
  let otherleft = bala.x;
  let otherright = bala.x + 5;
  let othertop = bala.y;
  let otherbottom = bala.y + 5;

  let colisiona = true;
  if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) 
  {
    colisiona = false;
  }
  return colisiona;
}

const world = {
  players: {},
  bullets: {},
};
let proyectileSpeed = 8;

const interval = setInterval(() => {
  const now = Date.now();

  for(const id in world.bullets)
  {
    const bullet = world.bullets[id];
    if(!bullet) continue;

    bullet.x += bullet.dir[0] * proyectileSpeed;
    bullet.y += bullet.dir[1] * proyectileSpeed;

    for(const token in world.players)
    {
      const player = world.players[token];
      if (!player) continue;
      const colision = colisiona(player, bullet);
      if(colision) 
      {
        if(player.token !== bullet.player) 
        {
          delete world.bullets[id];
          io.to(player.token).emit("damage", { damage: 1, player: bullet.player });
          io.emit("proupdatedel", { id });
        }
        break;
      }
    }

    if(now-bullet.tiempo > 5000) 
    {
      delete world.bullets[id];
      io.emit("proupdatedel", { id });
    }
  }

  io.emit("worldupdate", {
    players: world.players,
    bullets: world.bullets,
  });

}, 1000/20);

io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
    if(!world.players[socket.id]) world.players[socket.id] = {
      x:50, 
      y:50, 
      color:"#" + Math.floor(Math.random() * 16777215).toString(16), 
      token: socket.id, 
      direction: [0, 0]
    };

    let response = socket.id;
    io.to(socket.id).emit("gettoken", { response });

    socket.on("playermove", ({ sx, sy }) => {
        world.players[socket.id].x += sx;
        world.players[socket.id].y += sy;
        if(sx != 0 || sy != 0) world.players[socket.id].direction = [sx, sy];
    });
    
    socket.on("proyectilspawn", ({ x, y, dx, dy }) => {
      let id = randomUUID();
      let pro = {
        x: x,
        y: y,
        dir: [dx, dy],
        id: id,
        player: socket.id,
        tiempo: Date.now(),
      }

      world.bullets[id] = pro;
    });

    socket.on("addkill", ({ player }) => {
      io.to(player).emit("addscore", { score: 50 });
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
      delete world.players[socket.id];
    });
});

app.post('/register', express.json(), async function(req,res){
    const { nombre, email, password, isGoogleUser } = req.body;
    const google = isGoogleUser == 'true'; 
    await register(nombre, email, password, google)
    .then(async result => {
      console.log(result)
        res.json(result);
    })
    .catch(err => res.status(500).send(err));
});

app.post('/login', express.json(), async function(req,res){
    const { email, password, isGoogleUser } = req.body; 
    const google = isGoogleUser == 'true';
    await login(email, password, google)
    .then(async result => {
        let resultado = {
          loginCorrecto: result.length > 0,
          admin: result[0].admin == 1 || false,
        }
        res.json(resultado);
    })
    .catch(err => res.status(500).send(err));
});

app.post('/edituser', express.json(), async function(req,res){
    const { nombre, email, password, oldemail, oldpassword, isGoogleUser } = req.body;
    const google = isGoogleUser == 'true'; 
    await editUser(email, password, oldemail, oldpassword, google, nombre)
    .then(async result => {
        res.json(result);
    })
    .catch(err => res.status(500).send(err));
});

app.post('/getdata', express.json(), async function(req,res){
    const { email } = req.body; 
    await getUserData(email)
    .then(async result => {
        res.json(result);
    })
    .catch(err => res.status(500).send(err));
});

app.post('/addScore', express.json(), async function(req,res){
    const { email, newScore } = req.body; 
    await addScore(email, newScore)
    .then(async result => {
        res.json(result);
    })
    .catch(err => res.status(500).send(err));
});

app.get('/jugadores', (res, req)=> {
    req.json(world.players);
});

app.get('/highscores', async (req, res) => {
    let scores = await getAllScores();
    res.json(scores);
});
  
httpServer.listen(3001, () => console.log("Servidor escuchando en http://localhost:3001"));