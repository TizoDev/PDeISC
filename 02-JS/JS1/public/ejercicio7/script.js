document.getElementById('formText').addEventListener('submit', formText);

let valores = [];
function formText(event)
{
    event.preventDefault();
    
    let l = document.getElementById('valor').value;

    let valido = true;
    if(l == '')
    {
        document.getElementById('text').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        valores.push(l);
        document.getElementById('text').innerHTML = '';
        valores.forEach(element => {
            document.getElementById('text').innerHTML += element + ', '; 
        });
    }
}

function perro()
{
    let ind = valores.indexOf('perro');

    if(ind < 0) document.getElementById('index').innerHTML = 'No hay "perro" en el array';
    else document.getElementById('index').innerHTML = 'Perro en: ' + ind;
}

function buscar50()
{
    let ind = valores.indexOf('50');

    if(ind < 0) document.getElementById('index').innerHTML = 'No hay "50" en el array';
    else document.getElementById('index').innerHTML = '50 en: ' + ind;
}

function madrid()
{
    let ind = valores.indexOf('Madrid');

    if(ind < 0) document.getElementById('index').innerHTML = 'No hay "Madrid" en el array';
    else document.getElementById('index').innerHTML = 'Madrid en: ' + ind;
}