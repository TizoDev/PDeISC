document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formMensajes').addEventListener('submit', formMensajes);
document.getElementById('formClientes').addEventListener('submit', formClientes);

let numeros = [];
function formNumeros(event)
{
    event.preventDefault();
    
    let num = document.getElementById('numero').value;

    let valido = true;
    if(num == '')
    {
        document.getElementById('errorText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        document.getElementById('errorText').innerHTML = '';
        numeros.push(parseInt(num));
        document.getElementById('numerosText').innerHTML = '';
        numeros.forEach(element => {
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
    }
}

function eliminarNumero()
{
    numeros.shift();
    document.getElementById('numerosText').innerHTML = '';
    numeros.forEach(element => {
        document.getElementById('numerosText').innerHTML += element + ', '; 
    });
}

let chat = [];
function formMensajes(event)
{
    event.preventDefault();
    
    let mensaje = document.getElementById('mensaje').value;

    let valido = true;
    if(mensaje == '')
    {
        document.getElementById('chat').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        chat.push(mensaje);
        document.getElementById('chat').innerHTML = '';
        chat.forEach(element => {
            document.getElementById('chat').innerHTML += '<p>' + element + '</p>'; 
        });
    }
}

function eliminarMensaje()
{
    chat.shift();
    document.getElementById('chat').innerHTML = '';
    chat.forEach(element => {
        document.getElementById('chat').innerHTML += '<p>' + element + '</p>'; 
    });
}

let clientes = [];
function formClientes(event)
{
    event.preventDefault();
    
    let cliente = document.getElementById('cliente').value;

    let valido = true;
    if(cliente == '')
    {
        document.getElementById('clientes').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        clientes.push(cliente);
        document.getElementById('clientes').innerHTML = '';
        clientes.forEach(element => {
            document.getElementById('clientes').innerHTML += '<p>-' + element + '</p>'; 
        });
    }
}

function eliminarCliente()
{
    clientes.shift();
    document.getElementById('clientes').innerHTML = '';
    clientes.forEach(element => {
        document.getElementById('clientes').innerHTML += '<p>-' + element + '</p>'; 
    });
}