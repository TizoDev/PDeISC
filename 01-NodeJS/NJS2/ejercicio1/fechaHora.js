//Una funcion que devuelve la fecha actual
export function devolverFecha()
{
    const date = new Date();
    return date;
}
//Una funcion que devuelve la hora actual
export function devolverHora()
{
    const date = new Date();
    return date.getTime();
}
//Una funcion que devuelve el año actual
export function devolverYear()
{
    const date = new Date();
    return date.getFullYear();
}