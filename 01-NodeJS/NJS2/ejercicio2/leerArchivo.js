import { readFile } from 'node:fs/promises'
//Le pasamos una ruta por parametro y la leemos
export async function mostrarArchivo(ruta) 
{
    //Leemos con el readfile el archivo de la ruta indicada
    try {
        const contenido = await readFile(ruta, 'utf-8');
        return contenido; //Devolvemos el contenido del archivo
    } catch (error) {
        console.error("No se pudo leer el archivo.");
    }
}
