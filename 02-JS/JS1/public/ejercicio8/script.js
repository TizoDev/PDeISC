document.getElementById('formText').addEventListener('submit', formText);
document.getElementById('formColor').addEventListener('submit', formColor);
document.getElementById('formNumeros').addEventListener('submit', formNumeros);
//Se agregan los eventos de submit a los formularios

let valores = []; //Se crea un array para guardar los valores
function formText(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let l = document.getElementById('valor').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(l == '')
    {
        document.getElementById('text1').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        valores.push(l); //Se agregan los valores al final del array con push()
        document.getElementById('text1').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        valores.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('text1').innerHTML += element + ', '; 
        });
    }
}

function buscarAdmin()
{
    //Se busca si el array incluye el elemento 'admin'
    if(valores.includes('admin')) document.getElementById('index1').innerHTML = 'admin existe en el Array';
    else document.getElementById('index1').innerHTML = 'admin no existe en el array';
}

let colores = []; //Se crea un array para guardar los valores
function formColor(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let l = document.getElementById('color').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(l == '')
    {
        document.getElementById('text2').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        colores.push(l); //Se agregan los valores al final del array con push()
        document.getElementById('text2').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        colores.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('text2').innerHTML += element + ', '; 
        });
    }
}

function buscarVerde()
{
    //Se busca si el array incluye el elemento 'verde'
    if(colores.includes('verde')) document.getElementById('index2').innerHTML = 'verde existe en el Array';
    else document.getElementById('index2').innerHTML = 'verde no existe en el array';
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
    if(numeros.includes(parseInt(num))) //Se revisa que el array no tenga ya este elemento
    {
        document.getElementById('numerosText').innerHTML = "El Numero debe ser distinto al resto";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        numeros.push(parseInt(num)); //Se agrega el numero al final del array convirtiendolo a Int
        document.getElementById('numerosText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        numeros.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
    }
}