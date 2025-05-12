document.getElementById('formFrutas').addEventListener('submit', formFrutas);
document.getElementById('formAmigos').addEventListener('submit', formAmigos);
document.getElementById('formNumeros').addEventListener('submit', formNumeros);
//Se agregan los eventos de submit a los formularios

let frutas = []; //Se crea un array para guardar los valores
function formFrutas(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let f1 = document.getElementById('fruta1').value;
    let f2 = document.getElementById('fruta2').value;
    let f3 = document.getElementById('fruta3').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(f1 == '' || f2 == '' || f3 == '')
    {
        document.getElementById('frutasText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }

    if(valido) //En caso de que todo este como corresponda
    {
        frutas.push(f1); //Se agregan los valores al final del array con push()
        frutas.push(f2);
        frutas.push(f3);
        document.getElementById('frutasText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        frutas.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('frutasText').innerHTML += element + ', '; 
        });
    }
}

let amigos = []; //Se crea un array para guardar los valores
function formAmigos(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let a1 = document.getElementById('amigo1').value;
    let a2 = document.getElementById('amigo2').value;
    let a3 = document.getElementById('amigo3').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(a1 == '' || a2 == '' || a3 == '')
    {
        document.getElementById('amigosText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }

    if(valido) //En caso de que todo este como corresponda
    {
        amigos.push(a1); //Se agregan los valores al final del array con push()
        amigos.push(a2);
        amigos.push(a3);
        document.getElementById('amigosText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        amigos.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('amigosText').innerHTML += element + ', '; 
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
        document.getElementById('errorText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(parseInt(num) <= numeros[numeros.length-1]) //Se revisa si el numero es mayor al anterior
    {
        document.getElementById('errorText').innerHTML = "El Numero debe ser mayor al anterior";
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