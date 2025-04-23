//Importando el modulo express
const express = require('express');
const app = express();
//Creando una app rapida con express
app.get('/', (req, res) => {
    //Enviandole un titulo al html
    res.send("<h1>Hola Mundo</h1>");
});
//Iniciando el servidor
app.listen(8081, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:8081');
});
