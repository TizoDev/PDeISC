//Importando el modulo express y el modulo path
const express = require('express');
const app = express();
const path = require('path');
const port = 8081;

//Le indicamos a app que utilize la carpeta de public
app.use(express.static(path.join(__dirname, 'public')));

//Creamos el servidor y le agregamos cada ruta que hace falta, uno para el index y uno por pagina web
app.get('/', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/simon', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/simon', 'index.html'));
});
app.get('/tateti', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/tateti', 'index.html'));
});
app.get('/piedra-papel-tijeras', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ppt', 'index.html'));
});

//Iniciando el servidor
app.listen(port, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:' + port);
});