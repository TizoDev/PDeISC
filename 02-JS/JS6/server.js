//Importando el modulo express y el modulo path
import express from 'express';
import axios from 'axios';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const app = express();
const port = 8081;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function leerUrl(url) 
{
    try 
    {
        const response = await axios.get(url);
        return response.data;
    } catch (error) 
    {
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

let usuarios = [];
app.post('/addUsuario', function(req,res){
    const { nombre, email } = req.body;
    
    const usuario = {
        id: usuarios.length,
        name: nombre,
        email
    };
    usuarios.push(usuario);
    res.send(usuarios.length-1);
});

app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});

//Iniciando el servidor
app.listen(port, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:' + port);
});