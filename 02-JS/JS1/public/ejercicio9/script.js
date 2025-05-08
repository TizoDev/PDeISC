document.getElementById('formNombres').addEventListener('submit', formNombres);
document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formNombresEdad').addEventListener('submit', formNombresEdad);

let nombres = [];
function formNombres(event)
{
    event.preventDefault();
    
    let l = document.getElementById('nombre').value;

    let valido = true;
    if(l == '')
    {
        document.getElementById('nombreText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        nombres.push(l);
        document.getElementById('nombreText').innerHTML = '';
        nombres.forEach(element => {
            document.getElementById('nombreText').innerHTML += '<p>Saludos ' + element + '</p>'; 
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
        document.getElementById('numerosText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(parseInt(num) <= numeros[numeros.length-1])
    {
        document.getElementById('numerosText').innerHTML = "El Numero debe ser mayor al anterior";
        valido = false;
    }
    if(valido)
    {
        numeros.push(parseInt(num));
        document.getElementById('numerosText').innerHTML = '';
        document.getElementById('numerosText2').innerHTML = '';
        numeros.forEach(element => {
            document.getElementById('numerosText').innerHTML += element + ', '; 
            document.getElementById('numerosText2').innerHTML += (element*2) + ', '; 
        });
    }
}

let objetos = []
function formNombresEdad(event)
{
    event.preventDefault();
    
    let n = document.getElementById('nombre2').value;
    let e = document.getElementById('edad').value;

    let valido = true;
    if(n == '' || e == '')
    {
        document.getElementById('text').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        let obj = {
            nombre : n,
            edad : parseInt(e),
        };
        objetos.push(obj);
        document.getElementById('text').innerHTML = '';
        objetos.forEach(element => {
            document.getElementById('text').innerHTML += '<p>' + obj.nombre + ', ' + obj.edad + '</p>'; 
        });
    }
}