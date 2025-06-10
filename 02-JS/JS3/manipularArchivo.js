import { writeFile, readFile } from 'node:fs/promises'
import { createWriteStream } from 'node:fs'
//Le enviamos por parametro la ruta y el contenido para el archivo
//Si el archivo de la ruta no existe va a crearlo
//Si el archivo ya existe lo va a sobreescribir
export async function writeToFile(fileName, data) 
{
    try {
      //Intenta escribir el archivo o crearlo en caso de ser necesario
      await writeFile(fileName, data);
    } catch (error) {
      //Si no se puede alerta por consola
      console.error(`error: ${error.message}`);
    }
}

//Escribe en un archivo linea por linea el contenido de un array
export function writeLines(fileName, array)
{
    var stream = createWriteStream(fileName);
    stream.once('open', function(fd){
        array.forEach(element => {
            stream.write(element + '\n');
        });
        stream.end();
    });
}

//Le pasamos una ruta por parametro y la leemos
export async function mostrarArchivo(ruta) 
{
    //Leemos con el readfile el archivo de la ruta indicada
    try {
        const contenido = await readFile(ruta, 'utf-8');
        return contenido; //Devolvemos el contenido del archivo
    } catch (error) {
        console.error("No se pudo leer el archivo." + error);
    }
}