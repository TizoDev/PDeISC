let num = 0;
let maxNum = 5;
//Modificar el maxNUm dependiendo de la cantidad d funciones
function actualizar()
{
    switch(num)
    {
        case 0: 
            document.getElementById('botonFuncion').onclick = agregarH1;
            document.getElementById('botonFuncion').innerHTML = 'Agregar Titulo';
            break;
        case 1:
            document.getElementById('botonFuncion').onclick = cambiarH1;
            document.getElementById('botonFuncion').innerHTML = 'Cambiar Titulo';
            break;
        case 2:
            document.getElementById('botonFuncion').onclick = borrarH1;
            document.getElementById('botonFuncion').innerHTML = 'Borrar Titulo';
            break;
    }
}

function siguiente()
{
    if(num < maxNum) num++;
    else if(num == maxNum)
    {
        num = 0;
    }
    actualizar();
}

function anterior()
{
    if(num > 0) num--;
    else
    {
        num = maxNum;
    }
    actualizar();
}

function agregarH1()
{
    document.getElementById('body').innerHTML += '<h1 class="titulo"> Hola DOM </h1>';
}

function cambiarH1()
{
    let coleccion = document.getElementsByClassName('titulo');
    coleccion[coleccion.length-1].innerHTML = "Chau DOM";
}

function borrarH1()
{
    let coleccion = document.getElementsByClassName('titulo');
    coleccion[coleccion.length-1].remove();
}

function colorH1()
{
    let coleccion = document.getElementsByClassName('titulo');
    coleccion[coleccion.length-1]

    //Generar color aleatorio
}