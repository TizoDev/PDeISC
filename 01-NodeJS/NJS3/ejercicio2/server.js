//Importando el modulo express y el modulo path
const express = require('express');
const app = express();
const path = require('path');

//Le indicamos a app que utilize la carpeta de public
app.use(express.static(path.join(__dirname, 'public')));

//Creamos el servidor y le agregamos cada ruta que hace falta, uno para el index y uno por pagina web
app.get('/', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/pag1', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina1.html'));
});

app.get('/pag2', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina2.html'));
});

app.get('/pag3', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina3.html'));
});

app.get('/pag4', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina4.html'));
});

app.get('/pag5', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pagina5.html'));
});

//Iniciando el servidor
app.listen(8081, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:8081');
});