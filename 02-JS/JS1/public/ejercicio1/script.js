document.getElementById('formFrutas').addEventListener('submit', formFrutas);
document.getElementById('formAmigos').addEventListener('submit', formAmigos);
document.getElementById('formNumeros').addEventListener('submit', formNumeros);

function formFrutas(event)
{
    event.preventDefault();
    let frutas = [];
    
    let f1 = document.getElementById('fruta1').value;
    let f2 = document.getElementById('fruta2').value;
    let f3 = document.getElementById('fruta3').value;

    let valido = true;
    if(f1 == '' || f2 == '' || f3 == '')
    {
        document.getElementById('frutasText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }

    if(valido)
    {
        frutas.push(f1);
        frutas.push(f2);
        frutas.push(f3);
        document.getElementById('frutasText').innerHTML = '';
        frutas.forEach(element => {
            document.getElementById('frutasText').innerHTML += element + ', '; 
        });
    }
}

let amigos = [];
function formAmigos(event)
{
    event.preventDefault();
    
    let a1 = document.getElementById('amigo1').value;
    let a2 = document.getElementById('amigo2').value;
    let a3 = document.getElementById('amigo3').value;

    let valido = true;
    if(a1 == '' || a2 == '' || a3 == '')
    {
        document.getElementById('amigosText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }

    if(valido)
    {
        amigos.push(a1);
        amigos.push(a2);
        amigos.push(a3);
        document.getElementById('amigosText').innerHTML = '';
        amigos.forEach(element => {
            document.getElementById('amigosText').innerHTML += element + ', '; 
        });
    }
}

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
    if(parseInt(num) <= numeros[numeros.length-1])
    {
        document.getElementById('errorText').innerHTML = "El Numero debe ser mayor al anterior";
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