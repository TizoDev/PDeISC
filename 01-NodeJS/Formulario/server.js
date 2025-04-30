//Importando el modulo express y el modulo path
const express = require('express');
const app = express();
const path = require('path');
const port = 8081;
const usuarios = [];

app.use(express.urlencoded({extended : true}));

//Le indicamos a app que utilize la carpeta de public
app.use(express.static(path.join(__dirname, 'public')));

app.post('/enviar', (req, res) =>{
    
    const usuario = {
        usr : req.body.usr,
        pass : req.body.pass
    }
    usuarios.push(usuario);
    console.log(usuario);
    res.send('Usuario agregado correctamente, <a href="/"> Volver </a>');
});


//Creamos el servidor y le agregamos cada ruta que hace falta, uno para el index y uno por pagina web
app.get('/', (req, res) => {
    //Le enviamos el archivo de index.html al servidor
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/usuarios', (req, res) => {
    let lista = '<style> *{text-align: center;} </style>';
    lista += '<h1> Listado Usuarios </h1><ul>';
    usuarios.forEach(p => {
        lista += '<li>' + p.usr + ' ' + p.pass + 'A</li>';
    });
    lista += '</ul><a href="/"> Volver </a>';
    res.send(lista);
});

//Iniciando el servidor
app.listen(port, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:' + port);
});