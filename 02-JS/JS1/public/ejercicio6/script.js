document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formPeliculas').addEventListener('submit', formPeliculas);
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
        document.getElementById('numerosText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        numeros.push(parseInt(num)); //Se agrega el numero al final del array convirtiendolo a Int
        document.getElementById('numerosText').innerHTML = '<p>';
        numeros.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
        document.getElementById('numerosText').innerHTML += '</p>';
    }
}

let copiaNumeros = []; //Se crea un array para guardar los valores
function copiar()
{
    copiaNumeros = numeros.slice(0, 3); //Se copia en un nuevo array una seccion del antiguo array

    document.getElementById('numerosText').innerHTML = '<p>';
    numeros.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('numerosText').innerHTML += element + ', '; 
    });
    document.getElementById('numerosText').innerHTML += '</p><p>';
    copiaNumeros.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('numerosText').innerHTML += element + ', '; 
    });
    document.getElementById('numerosText').innerHTML += '</p>';
}


let peliculas = []; //Se crea un array para guardar los valores
function formPeliculas(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let pe = document.getElementById('pelicula').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(pe == '')
    {
        document.getElementById('pelisText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        peliculas.push(pe); //Se agregan los valores al final del array con push()
        document.getElementById('pelisText').innerHTML = '<p>'; //Se vacia la etiqueta para mostrar los valores
        peliculas.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('pelisText').innerHTML += element + ', '; 
        });
        document.getElementById('pelisText').innerHTML += '</p>';
    }
}

let copiaPelis = []; //Se crea un array para guardar los valores
function copiar()
{
    copiaPelis = peliculas.slice(2, 5); //Se copia una seccion del array en un nuevo array
    
    document.getElementById('pelisText').innerHTML = '<p>'; //Se vacia la etiqueta para mostrar los valores
    peliculas.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('pelisText').innerHTML += element + ', '; 
    });
    document.getElementById('pelisText').innerHTML += '</p><p>';
    copiaPelis.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('pelisText').innerHTML += element + ', '; 
    });
    document.getElementById('pelisText').innerHTML += '</p>';
}

function copiarUltimos()
{
    copiaPelis = peliculas.slice(peliculas.length-3, peliculas.length); //Se copian los ultimos elementos del array
    
    document.getElementById('pelisText').innerHTML = '<p>'; //Se vacia la etiqueta para mostrar los valores
    peliculas.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('pelisText').innerHTML += element + ', '; 
    });
    document.getElementById('pelisText').innerHTML += '</p><p>';
    copiaPelis.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('pelisText').innerHTML += element + ', '; 
    });
    document.getElementById('pelisText').innerHTML += '</p>';
}