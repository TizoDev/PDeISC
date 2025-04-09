//Se crean 4 funciones independientes que toman 2 numeros como parametro
//Toma los 2 numeros y devuelve la suma
function sumar(n1, n2)
{
    return n1+n2;
}
//Toma los 2 numeros y devuelve la resta
function restar(n1, n2)
{
    return n1-n2;
}
//Toma los 2 numeros y devuelve la division del primero sobre el segundo
function dividir(n1, n2)
{
    return n1/n2;
}
//Toma los 2 numeros y devuelve la multiplicacion
function multiplicar(n1, n2)
{
    return n1*n2;
}

//Llamamos a las funciones y mostramos los valores que devuelven
console.log(sumar(4,5));
console.log(restar(3,6));
console.log(multiplicar(2,7));
console.log(dividir(20,4));