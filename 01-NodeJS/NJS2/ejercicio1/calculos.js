//Una funcion que retorna el valor de la suma de 2 numeros
export function sumar(n1, n2)
{
    return n1+n2;
}
//Una funcion que retorna el valor de la resta de 2 numeros
export function restar(n1, n2)
{
    return n1-n2;
}
//Una funcion que retorna el valor de la multiplicacion de 2 numeros
export function multiplicar(n1, n2)
{
    return n1*n2;
}
//Una funcion que retorna el valor de la divicion de n1 sobre n2;
export function dividir(n1, n2)
{
    return n1/n2;
}
//Una funcion que retorna un numero (num) exponenciado a otro numero (exp)
export function potencia(num, exp)
{
    let result = 1;
    for(let i=0; i<exp; i++)
    {
        result = result*num;
    }
    return result;
}