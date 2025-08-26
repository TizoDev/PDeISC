//Imports
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {connectBD} from './conectbd.js';
import cors from 'cors';

const app = express();
const port = 8081; //Puerto asignado
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors()); //Se utiliza Cors para que se puedan hacer llamados a la API desde el LocalHost
//Le indicamos a app que utilize la carpeta de public
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

//Funciones para la BD
async function getRows() //Devuelve toda la tabla de usuarios
{
    const db = await connectBD();
    if(!db) return;

    const [rows] = await db.execute('SELECT * FROM usuarios');
    return rows;
};

//Permite insertar un nuevo usuario
async function insertInto(nombre, apellido, direccion, telefono, fecha_nacimiento, email) 
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;
        const sql = 'INSERT INTO usuarios (nombre, apellido, direccion, telefono, fecha_nacimiento, email) VALUES (?, ?, ?, ? ,?, ?)';
        const [result] = await db.execute(sql, [nombre, apellido, direccion, telefono, fecha_nacimiento, email]);
        console.log(result.affectedRows);
        return result;
    } catch(error)
    {
        console.error(error);
    }
};

//Permite modificar un usuario ya existente por ID
async function updateUser(id, nombre, apellido, direccion, telefono, fecha_nacimiento, email) 
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;
        const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, fecha_nacimiento = ?, email = ? WHERE id  = ?';
        const [result] = await db.execute(sql, [nombre, apellido, direccion, telefono, fecha_nacimiento, email, parseInt(id)]);
        console.log(result.affectedRows);
        return result;
    } catch(error)
    {
        console.error(error);
    }
};

//Elimina un usuario de la base de datos por ID
async function deleteUser(id) 
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;
        const sql = 'DELETE FROM usuarios WHERE id  = ?';
        const [result] = await db.execute(sql, [parseInt(id)]);
        console.log(result.affectedRows);
        return result;
    } catch(error)
    {
        console.error(error);
    }
};

//Creamos el servidor y le agregamos cada ruta que hace falta, uno para el index y uno por pagina web
app.get('/', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

//Metodos para que el usuario pueda interactuar con la base de datos
app.post('/addUsuario', async function(req,res){
    const { nombre, apellido, direccion, telefono, fecha_nacimiento, email } = req.body; //Valores del usuario
    await insertInto(nombre, apellido, direccion, telefono, fecha_nacimiento, email)
    .then(async result => {
        res.send(result);
    })
    .catch(err => res.status(500).send(err));
});

app.post('/modUsuario', async function(req,res){
    const { id, nombre, apellido, direccion, telefono, fecha_nacimiento, email } = req.body; //Valores del usuario
    await updateUser(id, nombre, apellido, direccion, telefono, fecha_nacimiento, email)
    .then(async result => {
        res.send(result);
    })
    .catch(err => res.status(500).send(err));
});

app.post('/delUsuario', async function(req,res){
    const { id } = req.body; //Valores del usuario
    await deleteUser(id)
    .then(async result => {
        res.send(result);
    })
    .catch(err => res.status(500).send(err));
});

//Api que guarda los valores de todos los usuarios
app.get('/api/usuarios', async (req, res) => {
    let usu = await getRows();
    res.json(usu);
});

//Iniciando el servidor
app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});