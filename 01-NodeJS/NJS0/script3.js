//Importamos el servidor
import { createServer } from 'node:http';

//Creamos una variable servidor
const server = createServer((req, res) => {
    //Iniciamos el tipo de texto en html
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //Escribimos un titulo de color rojo con el formato html
    res.write('<h1 style="color:red"> Hola </h1>');
    //Finalizamos el archivo con un parrafo
    res.end('<p> Hola mundo en HTML </p>');
});

//Inicializamos el servidor en el puerto 8081
server.listen(8081, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:8081');
});

