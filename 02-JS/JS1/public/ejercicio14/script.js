document.getElementById('formLetra').addEventListener('submit', formLetra);
document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formString').addEventListener('submit', formString);

let elementos = [];
function formLetra(event)
{
    event.preventDefault();
    
    let l = document.getElementById('letra').value;

    let valido = true;
    if(l == '')
    {
        document.getElementById('letraText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        elementos.push(l);
        elementos.reverse();
        document.getElementById('letraText').innerHTML = '';
        elementos.forEach(element => {
            document.getElementById('letraText').innerHTML += element + ','; 
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
    if(valido)
    {
        numeros.push(parseInt(num));
        numeros.reverse();
        document.getElementById('numerosText').innerHTML = '';
        numeros.forEach(element => {
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
    }
}

function formString(event)
{
    event.preventDefault();
    
    let l = document.getElementById('string').value;

    let valido = true;
    if(l == '')
    {
        document.getElementById('stringText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        let s = [];
        
        for(let i=0; i<l.length; i++) s.push(l[i]);
        s.reverse();
        document.getElementById('stringText').innerHTML = '';
        s.forEach(element => {
            document.getElementById('stringText').innerHTML += element; 
        });
    }
}