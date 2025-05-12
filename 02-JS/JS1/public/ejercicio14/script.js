document.getElementById('formLetra').addEventListener('submit', formLetra);
document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formString').addEventListener('submit', formString);
//Se agregan los eventos de submit a los formularios

let elementos = []; //Se crea un array para guardar los valores
function formLetra(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let l = document.getElementById('letra').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(l == '')
    {
        document.getElementById('letraText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        elementos.push(l); //Se agregan los valores al final del array con push()
        elementos.reverse(); //Se revierte el array
        document.getElementById('letraText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        elementos.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('letraText').innerHTML += element + ','; 
        });
    }
}

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
        numeros.reverse(); //Se revierte el array
        document.getElementById('numerosText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        numeros.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
    }
}

function formString(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let l = document.getElementById('string').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(l == '')
    {
        document.getElementById('stringText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        let s = []; //Se crea un array para guardar los valores
        
        for(let i=0; i<l.length; i++) s.push(l[i]); //Se guardan todos los valores del string en el array
        s.reverse(); //Se revierte el array
        document.getElementById('stringText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        s.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('stringText').innerHTML += element; 
        });
    }
}