//Importando el modulo express y el modulo path
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { CZooAnimal } from './animal.js';
import { mostrarArchivo, addToFile } from './manipularArchivo.js'; 
const app = express();
const port = 8081;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Le indicamos a app que utilize la carpeta de public
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

//Creamos el servidor y le agregamos cada ruta que hace falta, uno para el index y uno por pagina web
app.get('/', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

let animales = []; //Array para guardar a los animales
const rutaAnimales = 'animales.txt';
app.post('/guardarAnimal', function(req, res){
    const { nombre, jaula, tipo, peso } = req.body;
    let animal = new CZooAnimal(animales.length, nombre, jaula, tipo, peso);
    animales.push(animal); //Crea un nuevo animal y lo agrega al array y al txt
    addToFile(rutaAnimales, animal.toString());
    /*
        Se agrega al txt los datos del animal, en caso de que la direccion indicada no exista
        se crea un txt en esa direccion, si ya existe solo se agrega al final del archivo
    */
});

app.post('/obtenerInfo', async function(req, res) {
    try {
        const contenido = await mostrarArchivo(rutaAnimales);
        res.send(contenido); // Envía el contenido del archivo al cliente
    } catch (error) {
        res.status(500).send('Error al leer el archivo');
    }
});

//Iniciando el servidor
app.listen(port, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:' + port);
});