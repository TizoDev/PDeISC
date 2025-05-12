document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formMensajes').addEventListener('submit', formMensajes);
document.getElementById('formClientes').addEventListener('submit', formClientes);
//Se agregan los eventos de submit a los formularios

let numeros = []; //Se crea un array para guardar los valores
function formNumeros(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let num = document.getElementById('numero').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(num == '')
    {
        document.getElementById('errorText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        document.getElementById('errorText').innerHTML = ''; //Se limpian los errores previos
        numeros.push(parseInt(num)); //Se agrega el numero al final del array convirtiendolo a Int
        document.getElementById('numerosText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        numeros.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
    }
}

function eliminarNumero()
{
    numeros.shift(); //Elimina el primer elemento
    document.getElementById('numerosText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
    numeros.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('numerosText').innerHTML += element + ', '; 
    });
}

let chat = []; //Se crea un array para guardar los valores
function formMensajes(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let mensaje = document.getElementById('mensaje').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(mensaje == '')
    {
        document.getElementById('chat').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        chat.push(mensaje); //Se agregan los valores al final del array con push()
        document.getElementById('chat').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        chat.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('chat').innerHTML += '<p>' + element + '</p>'; 
        });
    }
}

function eliminarMensaje()
{
    chat.shift(); //Se elimina el primer elemento
    document.getElementById('chat').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
    chat.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('chat').innerHTML += '<p>' + element + '</p>'; 
    });
}

let clientes = []; //Se crea un array para guardar los valores
function formClientes(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let cliente = document.getElementById('cliente').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(cliente == '')
    {
        document.getElementById('clientes').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        clientes.push(cliente); //Se agregan los valores al final del array con push()
        document.getElementById('clientes').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        clientes.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('clientes').innerHTML += '<p>-' + element + '</p>'; 
        });
    }
}

function eliminarCliente()
{
    clientes.shift(); //Se elimina el primer elemento
    document.getElementById('clientes').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
    clientes.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('clientes').innerHTML += '<p>-' + element + '</p>'; 
    });
}