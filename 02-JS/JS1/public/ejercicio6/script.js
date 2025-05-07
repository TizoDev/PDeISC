document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formPeliculas').addEventListener('submit', formPeliculas);

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
        document.getElementById('numerosText').innerHTML = '<p>';
        numeros.forEach(element => {
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
        document.getElementById('numerosText').innerHTML += '</p>';
    }
}

let copiaNumeros = [];
function copiar()
{
    copiaNumeros = numeros.slice(0, 3);

    document.getElementById('numerosText').innerHTML = '<p>';
    numeros.forEach(element => {
        document.getElementById('numerosText').innerHTML += element + ', '; 
    });
    document.getElementById('numerosText').innerHTML += '</p><p>';
    copiaNumeros.forEach(element => {
        document.getElementById('numerosText').innerHTML += element + ', '; 
    });
    document.getElementById('numerosText').innerHTML += '</p>';
}


let peliculas = [];
function formPeliculas(event)
{
    event.preventDefault();
    
    let pe = document.getElementById('pelicula').value;

    let valido = true;
    if(pe == '')
    {
        document.getElementById('pelisText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        peliculas.push(pe);
        document.getElementById('pelisText').innerHTML = '<p>';
        peliculas.forEach(element => {
            document.getElementById('pelisText').innerHTML += element + ', '; 
        });
        document.getElementById('pelisText').innerHTML += '</p>';
    }
}

let copiaPelis = [];
function copiar()
{
    copiaPelis = peliculas.slice(2, 5);
    
    document.getElementById('pelisText').innerHTML = '<p>';
    peliculas.forEach(element => {
        document.getElementById('pelisText').innerHTML += element + ', '; 
    });
    document.getElementById('pelisText').innerHTML += '</p><p>';
    copiaPelis.forEach(element => {
        document.getElementById('pelisText').innerHTML += element + ', '; 
    });
    document.getElementById('pelisText').innerHTML += '</p>';
}

function copiarUltimos()
{
    copiaPelis = peliculas.slice(peliculas.length-3, peliculas.length);
    
    document.getElementById('pelisText').innerHTML = '<p>';
    peliculas.forEach(element => {
        document.getElementById('pelisText').innerHTML += element + ', '; 
    });
    document.getElementById('pelisText').innerHTML += '</p><p>';
    copiaPelis.forEach(element => {
        document.getElementById('pelisText').innerHTML += element + ', '; 
    });
    document.getElementById('pelisText').innerHTML += '</p>';
}