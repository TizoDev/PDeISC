// Importo el modulo http, junto con los demas modulos del ejercicio
import { createServer } from 'node:http';
import { sumar } from './calculos.js'
import { crearTitulo , crearParrafo } from './etiquetas.js';
import { devolverFecha } from './fechaHora.js';
//Creamos un servidor con el modulo http
const server = createServer((req, res) => {
  //Definimos el tipo de texto a html
  res.writeHead(200, { 'Content-Type': 'text/html' });
  //En el contenido del html llamamos al modulo de "etiquetas" para crar titulos y parrafos
  res.write(crearTitulo("Prueba", "black", 1));
  //Dentro del crearParrafo le agregamos la fecha actual con el modulo de "fechaHora"
  res.write(crearParrafo("Fecha actual: " + devolverFecha(), "black"));
  //Dentro del crearParrafo le agregamos la funcion sumar del modulo "calculos"
  res.write(crearParrafo("2+2=" + sumar(2,2), "black"));
  res.end();
});

// starts a simple http server locally on port 3000
server.listen(8081, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:8081');
});