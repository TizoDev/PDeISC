//Importando el modulo express, path, axios y url
import express from 'express';
import axios from 'axios';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 8081; //Puerto asignado
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Funcion que lee los datos de una API
async function leerUrl(url) 
{
    try 
    {
        //Se trata de leer los datos de la URL utilizando axios
        const response = await axios.get(url);
        return response.data;
    } catch (error) 
    {
        //En caso de que algo falle, como por ejemplo que la url este mal
        throw error;
    }
}

//Le indicamos a app que utilize la carpeta de public
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

//Creamos el servidor y le agregamos cada ruta que hace falta, uno para el index y uno por pagina web
app.get('/', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(join(__dirname, 'public', 'index.html'));
});
app.get('/c1', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(join(__dirname, 'public/consigna1', 'index.html'));
});
app.get('/c2', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(join(__dirname, 'public/consigna2', 'index.html'));
});
app.get('/c3', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(join(__dirname, 'public/consigna3', 'index.html'));
});
app.get('/c4', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(join(__dirname, 'public/consigna4', 'index.html'));
});

//Obtiene la informacion de una ruta especifica utilizando la funcion obtener ruta y lo envia 
app.post('/obtenerData', function(req, res){
    const { ruta } = req.body;
    leerUrl(ruta)
    .then(data => {
        res.send(data);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

let usuarios = []; //Array para guardar los usuarios de la api
app.post('/addUsuario', function(req,res){
    const { nombre, email } = req.body; //Valores del usuario
    
    //Objeto Usuario
    const usuario = {
        id: usuarios.length,
        name: nombre,
        email: email
    };
    //Se agrega el objeto al array y se envia su ID hacia quien solicito enviar este usuario
    usuarios.push(usuario);
    res.send(usuarios.length-1);
});

//Api que guarda los valores de todos los usuarios
app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});

//Iniciando el servidor
app.listen(port, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:' + port);
});