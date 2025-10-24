import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "*" }
});

let posiciones = {};
let proyectiles = 0;

io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);
    if(!posiciones[socket.id]) posiciones[socket.id] = {x:0, y:0, color:"#" + Math.floor(Math.random() * 16777215).toString(16), token: socket.id, direction: [0, 0]};
    let response = socket.id;
    io.to(socket.id).emit("gettoken", { response });

    socket.on("playermove", ({ sx, sy }) => {
        posiciones[socket.id].x += sx;
        posiciones[socket.id].y += sy;
        if(sx != 0 || sy != 0) posiciones[socket.id].direction = [sx, sy];

        io.emit("playerupdate", { posiciones });
    });
    
    socket.on("proyectilspawn", ({ x, y, dx, dy }) => {
      let pro = {
        x: x,
        y: y,
        dir: [dx, dy],
        id: proyectiles,
        player: socket.id,
        tiempo: Date.now(),
      }
      proyectiles++;

      io.emit("proupdatespawn", { pro });
    });

    socket.on("proyectildelete", ({ id, tiempo }) => {
      if(Date.now()-tiempo > 5000) io.emit("proupdatedel", { id });
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
      posiciones[socket.id] = null;
    });
});
  
httpServer.listen(3001, () => console.log("Servidor escuchando en http://localhost:3001"));