let num = 0; //Numero de Funcion Actual
let maxNum = 7; //Numero Maximo de funciones

function actualizar() //Se llama cada que se cambia el numero de funcion
{
    /*
        Va a revisar cual es la funcion actual dependiendo del numero
        al encontrar la funcion actual le va a agregar la funcionalidad correspondiente al boton principal
        y tambien le va a cambiar el contenido de html
    */
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
        case 3:
            document.getElementById('botonFuncion').onclick = colorH1;
            document.getElementById('botonFuncion').innerHTML = 'Color Titulo';
            break;
        case 4:
            document.getElementById('botonFuncion').onclick = agregarImagen;
            document.getElementById('botonFuncion').innerHTML = 'Agregar Imagen';
            break;
        case 5:
            document.getElementById('botonFuncion').onclick = borrarImagen;
            document.getElementById('botonFuncion').innerHTML = 'Borrar Imagen';
            break;
        case 6:
            document.getElementById('botonFuncion').onclick = cambiarImagen;
            document.getElementById('botonFuncion').innerHTML = 'Cambiar Imagen';
            break;
        case 7:
            document.getElementById('botonFuncion').onclick = tamanioImagen;
            document.getElementById('botonFuncion').innerHTML = 'Cambiar Tama&ntilde;o Imagen';
            break;
    }
}

function siguiente()
{
    /*
        Al llamar a esta funcion se incrementa el numero de funcion actual en 1
        si llega al limite se reinicia
    */
    if(num < maxNum) num++;
    else if(num == maxNum)
    {
        num = 0;
    }
    actualizar(); //Al determinar el numero llama a la funcion actualizar
}

function anterior()
{
    /*
        Al llamar a esta funcion se decrementa el numero de funcion actual en 1
        si llega a 0 se reinicia en el numero maximo
    */
    if(num > 0) num--;
    else
    {
        num = maxNum;
    }
    actualizar(); //Al determinar el numero llama a la funcion actualizar
}

function agregarH1()
{
    //Agrega un H1 con la clase titulo directamente en el html interno del body
    document.getElementById('body').innerHTML += '<h1 class="titulo"> Hola DOM </h1>';
}

function cambiarH1()
{
    /*
        Se obtiene un array con todos los titulos que hay actualmente en el body
        y se modifica el ultimo para que diga Chau DOM
    */
    let coleccion = document.getElementsByClassName('titulo');
    coleccion[coleccion.length-1].innerHTML = "Chau DOM";
}

function borrarH1()
{
    /*
        Se obtiene un array con todos los titulos que hay actualmente en el body
        y se elimina el ultimo
    */
    let coleccion = document.getElementsByClassName('titulo');
    coleccion[coleccion.length-1].remove();
}

function colorH1()
{
    /*
        Se obtiene un array con todos los titulos que hay actualmente en el body
        se generan 3 numeros aleatorios entre 1 y 255 para representar los colores R G B
        se modifica el ultimo titulo del array para que su color sea correspondiente
        a los valores generados aleatoriamente
    */
    let coleccion = document.getElementsByClassName('titulo');
    let r = (Math.floor(Math.random() * 254)+1);
    let g = (Math.floor(Math.random() * 254)+1);
    let b = (Math.floor(Math.random() * 254)+1);
    coleccion[coleccion.length-1].style.color = 'rgb(' + r +','+ g +','+ b + ')';
}

function agregarImagen()
{
    /*
        Agrega una imagen con la clase imagen directamente en el html interno del div imagenes
        aparte la inicializa con un tamaño de 200px
        y le crea el atributo personalizado "cara" para poder modificarlo en otra funcion
    */
    document.getElementById('imagenes').innerHTML += '<img src="bueno.png" alt="" class="imagen" height="200px" cara="0">';
}

function borrarImagen()
{
    /*
        Se obtiene un array con todas las imagenes que hay actualmente en el body
        y se elimina la ultima
    */
    let coleccion = document.getElementsByClassName('imagen');
    coleccion[coleccion.length-1].remove();
}

function cambiarImagen()
{
    //Se obtiene un array con todas las imagenes que hay actualmente en el body
    let coleccion = document.getElementsByClassName('imagen');
    let cara = coleccion[coleccion.length-1].cara; //Guarda el numero de cara que tiene actualmente

    //Genera un numero aleatorio entre 0 y 2 que sea distinto al numero actual que tiene la imagen
    let n = Math.floor(Math.random() * 3);
    while(n == cara)
    {
        n = Math.floor(Math.random() * 3);
    }

    //Cambia el source de la imagen y el atributo de cara dependiendo de que numero se genero
    //Siempre va a ser distinto al numero anterior
    switch(n)
    {
        case 0:
            coleccion[coleccion.length-1].src = 'bueno.png';
            coleccion[coleccion.length-1].cara = 0;
            break;
        case 1:
            coleccion[coleccion.length-1].src = 'malo.jpg';
            coleccion[coleccion.length-1].cara = 1;
            break;
        case 2:
            coleccion[coleccion.length-1].src = 'triste.jpg';
            coleccion[coleccion.length-1].cara = 2;
            break;
    }
}

function tamanioImagen()
{
    /*
        Se obtiene un array con todas las imagenes que hay actualmente en el body
        se generan 2 numeros aleatorios entre 10 y 509
        esos 2 numeros se utilizan para determinar la altura y anchura de la ultima imagen del array
    */
    let coleccion = document.getElementsByClassName('imagen');
    let h = (Math.floor(Math.random() * 500)+10);
    let w = (Math.floor(Math.random() * 500)+10);
    coleccion[coleccion.length-1].height = h;
    coleccion[coleccion.length-1].width = w;
}