//Imports
import bcrypt from 'bcrypt';
import cors from 'cors';
import express from 'express';
import { connectBD } from './conectbd.js';

const app = express();
const port = 3031; //Puerto asignado

app.use(cors()); //Se utiliza Cors para que se puedan hacer llamados a la API desde el LocalHost
app.use(express.json());

//Funciones para la BD
async function getUsuario(nombre, password)
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;
        const sql = 'SELECT * FROM usuarios WHERE nombre=?';
        const [result] = await db.execute(sql, [nombre]);

        if(result.length != 0)
        {
            const match = await bcrypt.compare(password, result[0].password);
            if(match) return result;
        }
        return result;
    } catch(error)
    {
        console.error(error);
    }
};

//Permite insertar un nuevo usuario
async function insertInto(nombre, password) 
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = 'INSERT INTO usuarios (nombre, password) VALUES (?, ?)';
        const [result] = await db.execute(sql, [nombre, hashedPassword]);
        console.log(result.affectedRows);
        return result;
    } catch(error)
    {
        console.error(error);
    }
};

//Metodos para que el usuario pueda interactuar con la base de datos
app.post('/addUsuario', async function(req,res){
    const { nombre, password } = req.body; //Valores del usuario
    await insertInto(nombre, password)
    .then(async result => {
        res.send(result);
    })
    .catch(err => res.status(500).send(err));
});

//Metodos para que el usuario pueda interactuar con la base de datos
app.post('/getUsuario', async function(req,res){
    const { nombre, password } = req.body; //Valores del usuario
    await getUsuario(nombre, password)
    .then(async result => {
        if(result.length < 1) res.json(0);
        else res.json(1);
    })
    .catch(err => res.status(500).send(err));
});

//Iniciando el servidor
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});