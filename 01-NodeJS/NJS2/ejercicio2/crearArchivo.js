import { writeFile } from 'node:fs/promises'

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