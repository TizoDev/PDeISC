document.getElementById('formAnimales').addEventListener('submit', formAnimales);
document.getElementById('formProductos').addEventListener('submit', formProductos);

let animales = [];
function formAnimales(event)
{
    event.preventDefault();
    
    let animal = document.getElementById('animal').value;

    let valido = true;
    if(animal == '')
    {
        document.getElementById('errorText1').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        document.getElementById('errorText1').innerHTML = '';
        animales.push(animal);
        document.getElementById('animalesText').innerHTML = '';
        animales.forEach(element => {
            document.getElementById('animalesText').innerHTML += element + ', '; 
        });
    }
}

function borrarAnimal()
{
    animales.pop();
    document.getElementById('animalesText').innerHTML = '';
    animales.forEach(element => {
        document.getElementById('animalesText').innerHTML += element + ', '; 
    });
}

let listaCompras = [];
function formProductos(event)
{
    event.preventDefault();
    
    let producto = document.getElementById('producto').value;

    let valido = true;
    if(producto == '')
    {
        document.getElementById('errorText2').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        document.getElementById('errorText2').innerHTML = '';
        listaCompras.push(producto);
        document.getElementById('productosText').innerHTML = '';
        listaCompras.forEach(element => {
            document.getElementById('productosText').innerHTML += element + ', '; 
        });
    }
}

function borrarProductos()
{
    document.getElementById('errorText2').innerHTML = 'Producto eliminado: ' + listaCompras[listaCompras.length -1];
    listaCompras.pop();
    document.getElementById('productosText').innerHTML = '';
    listaCompras.forEach(element => {
        document.getElementById('productosText').innerHTML += element + ', '; 
    });
}

function vaciarProductos()
{
    document.getElementById('productosText').innerHTML = '';
    while(listaCompras.length > 0) listaCompras.pop();
}