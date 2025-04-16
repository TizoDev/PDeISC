import { parse } from "node:url"

//Funcion para devolver la busqueda de una url
export function obtenerSearch(url)
{
    let q = parse(url, true); //Crea una variable con el parse
    return q.search; //Devuelve la busqueda que esta en el url
}