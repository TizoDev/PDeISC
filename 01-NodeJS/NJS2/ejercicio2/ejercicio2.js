// Importo el modulo http junto con los modulos del ejercicio
import { createServer } from 'node:http';
import { writeToFile } from './crearArchivo.js';
import { mostrarArchivo } from './leerArchivo.js';

/*
Si el archivo de prueba.html no esta creado lo va a crear
si ya esta creado lo va a sobreescribir
*/
writeToFile('prueba.html', '<h1> HOLA </h1>');

//Creo el servidor
const server = createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  //Mostramos el contenido del html
  try 
  {
    // Espera a que el archivo sea leído
    const contenido = await mostrarArchivo('prueba.html'); //Guardamos el contenido
    res.write(contenido.toString());  // Escribe el contenido en la respuesta
  } catch (error) {
    res.write('<h1>Error al cargar el archivo</h1>'); // En caso de error, muestra un mensaje de error
  }
  
  res.end();
});

// starts a simple http server locally on port 8081
server.listen(8081, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:8081');
});