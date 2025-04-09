//Importamos el servidor
import { createServer } from 'node:http';
//Importamos las 4 funciones desde el archivo calculo.js
import { sumar, restar, dividir, multiplicar } from './calculo.js'

//Creamos una variable servidor
const server = createServer((req, res) => {
    //Iniciamos el tipo de texto en html
    res.writeHead(200, { 'Content-Type': 'text/html' });
    //Estilo CSS para la tabla
    res.write('<style>table{border: 2px, solid, black;text-align: center;}td{width: 200px;}.tr1{background-color: gray;}.main{background-color: black;color: white;}</style>');
    //Comienzo de la tabla HTML
    res.write('<table><tr class="main"><td>Cuenta</td><td>Resultado</td></tr>');
    //Fila con la funcion sumar importada de calculo.js
    res.write('<tr><td>5+3</td><td>'+ sumar(5,3) +'</td></tr>');
    //Fila con la funcion restar importada de calculo.js
    res.write('<tr class="tr1"><td>8-6</td><td>'+ restar(8,6) +'</td></tr>');
    //Fila con la funcion multiplicar importada de calculo.js
    res.write('<tr><td>3*11</td><td>'+ multiplicar(3,11) +'</td></tr>');
    //Fila con la funcion dividr importada de calculo.js
    res.write('<tr class="tr1"><td>30/5</td><td>'+ dividir(30,5) +'</td></tr>');
    //Final de la tabla y del documento HTML
    res.end('</table>');
});

//Inicializamos el servidor en el puerto 8081
server.listen(8081, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:8081');
});

