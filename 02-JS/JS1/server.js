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
//Se crea un enlace por cada consigna
app.get('/ej1', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio1', 'index.html'));
});
app.get('/ej2', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio2', 'index.html'));
});
app.get('/ej3', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio3', 'index.html'));
});
app.get('/ej4', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio4', 'index.html'));
});
app.get('/ej5', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio5', 'index.html'));
});
app.get('/ej6', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio6', 'index.html'));
});
app.get('/ej7', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio7', 'index.html'));
});
app.get('/ej8', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio8', 'index.html'));
});
app.get('/ej9', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio9', 'index.html'));
});
app.get('/ej10', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio10', 'index.html'));
});
app.get('/ej11', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio11', 'index.html'));
});
app.get('/ej12', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio12', 'index.html'));
});
app.get('/ej13', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio13', 'index.html'));
});
app.get('/ej14', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio14', 'index.html'));
});
app.get('/ej15', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/ejercicio15', 'index.html'));
});


//Iniciando el servidor
app.listen(8081, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:8081');
});