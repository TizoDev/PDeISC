document.getElementById('formText').addEventListener('submit', formText);
document.getElementById('formColor').addEventListener('submit', formColor);
document.getElementById('formNumeros').addEventListener('submit', formNumeros);

let valores = [];
function formText(event)
{
    event.preventDefault();
    
    let l = document.getElementById('valor').value;

    let valido = true;
    if(l == '')
    {
        document.getElementById('text1').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        valores.push(l);
        document.getElementById('text1').innerHTML = '';
        valores.forEach(element => {
            document.getElementById('text1').innerHTML += element + ', '; 
        });
    }
}

function buscarAdmin()
{
    if(valores.includes('admin')) document.getElementById('index1').innerHTML = 'admin existe en el Array';
    else document.getElementById('index1').innerHTML = 'admin no existe en el array';
}

let colores = [];
function formColor(event)
{
    event.preventDefault();
    
    let l = document.getElementById('color').value;

    let valido = true;
    if(l == '')
    {
        document.getElementById('text2').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        colores.push(l);
        document.getElementById('text2').innerHTML = '';
        colores.forEach(element => {
            document.getElementById('text2').innerHTML += element + ', '; 
        });
    }
}

function buscarVerde()
{
    if(colores.includes('verde')) document.getElementById('index2').innerHTML = 'verde existe en el Array';
    else document.getElementById('index2').innerHTML = 'verde no existe en el array';
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
    if(numeros.includes(parseInt(num)))
    {
        document.getElementById('numerosText').innerHTML = "El Numero debe ser distinto al resto";
        valido = false;
    }
    if(valido)
    {
        numeros.push(parseInt(num));
        document.getElementById('numerosText').innerHTML = '';
        numeros.forEach(element => {
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
    }
}