document.getElementById('formText').addEventListener('submit', formText);
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
        document.getElementById('text').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        valores.push(l); //Se agregan los valores al final del array con push()
        document.getElementById('text').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        valores.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('text').innerHTML += element + ', '; 
        });
    }
}

function perro()
{
    //Se almacena el index
    let ind = valores.indexOf('perro');

    //En caso de que no exista el valor que se busca
    if(ind < 0) document.getElementById('index').innerHTML = 'No hay "perro" en el array';
    else document.getElementById('index').innerHTML = 'Perro en: ' + ind; //En caso que si exista
}

function buscar50()
{
    //Se almacena el index
    let ind = valores.indexOf('50');

    //En caso de que no exista el valor que se busca
    if(ind < 0) document.getElementById('index').innerHTML = 'No hay "50" en el array';
    else document.getElementById('index').innerHTML = '50 en: ' + ind; //En caso que si exista
}

function madrid()
{
    //Se almacena el index
    let ind = valores.indexOf('Madrid');

    //En caso de que no exista el valor que se busca
    if(ind < 0) document.getElementById('index').innerHTML = 'No hay "Madrid" en el array';
    else document.getElementById('index').innerHTML = 'Madrid en: ' + ind; //En caso que si exista
}