document.getElementById('formAnimales').addEventListener('submit', formAnimales);
document.getElementById('formProductos').addEventListener('submit', formProductos);
//Se agregan los eventos de submit a los formularios

let animales = []; //Se crea un array para guardar los valores
function formAnimales(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let animal = document.getElementById('animal').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(animal == '')
    {
        document.getElementById('errorText1').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        document.getElementById('errorText1').innerHTML = ''; //Se limpian los errores previos
        animales.push(animal); //Se agregan los valores al final del array con push()
        document.getElementById('animalesText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        animales.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('animalesText').innerHTML += element + ', '; 
        });
    }
}

function borrarAnimal()
{
    animales.pop(); //Borra el ultimo animal del array
    document.getElementById('animalesText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
    animales.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('animalesText').innerHTML += element + ', '; 
    });
}

let listaCompras = []; //Se crea un array para guardar los valores
function formProductos(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let producto = document.getElementById('producto').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(producto == '')
    {
        document.getElementById('errorText2').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        document.getElementById('errorText2').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        listaCompras.push(producto); //Se agregan los valores al final del array con push()
        document.getElementById('productosText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        listaCompras.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('productosText').innerHTML += element + ', '; 
        });
    }
}

function borrarProductos()
{
    //Muestra que producto se va a borrar
    document.getElementById('errorText2').innerHTML = 'Producto eliminado: ' + listaCompras[listaCompras.length -1];
    listaCompras.pop(); //Borra el ultimo producto de la lista
    document.getElementById('productosText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
    listaCompras.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('productosText').innerHTML += element + ', '; 
    });
}

function vaciarProductos()
{
    document.getElementById('productosText').innerHTML = ''; //Se vacia la etiqueta p
    while(listaCompras.length > 0) listaCompras.pop(); //Mientras el array no este vacio borra el ultimo elemento
}