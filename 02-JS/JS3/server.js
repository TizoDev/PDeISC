//Importando el modulo express y el modulo path
const express = require('express');
const app = express();
const path = require('path');
const port = 8081;
const { writeToFile } = require('./manipularArchivo.js');

//Le indicamos a app que utilize la carpeta de public
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

//Creamos el servidor y le agregamos cada ruta que hace falta, uno para el index y uno por pagina web
app.get('/', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/proyecto-1', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/pro1', 'index.html'));
});
app.get('/proyecto-2', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public/pro2', 'index.html'));
});

// Nueva ruta POST para recibir datos y escribir archivo
app.post('/guardarArchivo', async (req, res) => {
    const { fileName, data } = req.body;
    if (!fileName || !data) {
      return res.status(400).json({ error: 'Falta fileName o data' });
    }
    try {
        //Archivo guardado correctamente
      await writeToFile(fileName, data);
      res.json({ message: 'Archivo guardado correctamente' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

//Iniciando el servidor
app.listen(port, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:' + port);
});