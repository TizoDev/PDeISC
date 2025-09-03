import axios from 'axios';

//Lee una url dada y devuelve el contenido
export async function leerUrl(url) 
{
    try 
    {
        //Se trata de leer los datos de la URL utilizando axios
        const response = await axios.get(url);
        return response.data;
    } catch (error) 
    {
        //En caso de que algo falle, como por ejemplo que la url este mal
        throw error;
    }
}