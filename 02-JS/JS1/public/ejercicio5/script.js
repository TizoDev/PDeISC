document.getElementById('formLetras').addEventListener('submit', formLetras);
//Se agregan los eventos de submit a los formularios

let letras = []; //Se crea un array para guardar los valores
function formLetras(event)
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
    if(verificarText(l))
    {
        document.getElementById('letraText').innerHTML = "Porfavor no Utilizar caracteres especiales";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        letras.push(l); //Se agregan los valores al final del array con push()
        document.getElementById('letraText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        letras.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('letraText').innerHTML += element + ', '; 
        });
    }
}

function eliminarLetra()
{
    letras.splice(1, 2); //Se elimina una seccion del array
    document.getElementById('letraText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
    letras.forEach(element => { //Se muestran los valores en el documento
        document.getElementById('letraText').innerHTML += element + ', '; 
    });
}

function insertar()
{
    //Se crean variables para almacenar los valores
    let l = document.getElementById('letra').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(l == '')
    {
        document.getElementById('letraText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(verificarText(l))
    {
        document.getElementById('letraText').innerHTML = "Porfavor no Utilizar caracteres especiales";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        letras.splice(2, 0, l); //Se inserta un valor al array
        document.getElementById('letraText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        letras.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('letraText').innerHTML += element + ', '; 
        });
    }
}

function reemplazar()
{
    //Se crean variables para almacenar los valores
    let l = document.getElementById('letra').value;
    let n = document.getElementById('pos').value

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(l == '' || n == '')
    {
        document.getElementById('letraText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(verificarText(l))
    {
        document.getElementById('letraText').innerHTML = "Porfavor no Utilizar caracteres especiales";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        letras.splice(parseInt(n), 1, l); //Se reemplaza un valor del array
        document.getElementById('letraText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        letras.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('letraText').innerHTML += element + ', '; 
        });
    }
}

function verificarText(s)
{
    //Revisa cada caracter para asegurarse que entre en el estandar
    //En caso de no estar en el estandar devuelve true
    for(let i=0; i<s.length; i++)
    {
        if(!/[a-zA-Z]/.test(s[i]) && s[i] !== 'ñ' && s[i] !== ' ') return true;
    }
    return false;
}
