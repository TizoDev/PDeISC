document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formPalabras').addEventListener('submit', formPalabras);
document.getElementById('formObjetos').addEventListener('submit', formObjetos);
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
        let filtro = numeros.filter((n) => n>10); //Se filtran todos los numeros mayores a 10
        document.getElementById('numerosText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        document.getElementById('numerosText2').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        numeros.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
        filtro.forEach(element => {
            document.getElementById('numerosText2').innerHTML += element + ', '; 
        });
    }
}

let palabras = []; //Se crea un array para guardar los valores
function formPalabras(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let l = document.getElementById('palabra').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(l == '')
    {
        document.getElementById('palabraText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        palabras.push(l);
        let filtro = palabras.filter((p) => p.length>5); //Se filtran todos los strings que tengan mas de 5 caracteres
        document.getElementById('palabraText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        document.getElementById('palabraText2').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        palabras.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('palabraText').innerHTML += element + ','; 
        });
        filtro.forEach(element => {
            document.getElementById('palabraText2').innerHTML += element + ', '; 
        });
    }
}

let usuarios = []; //Se crea un array para guardar los valores
function formObjetos(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let l = document.getElementById('nombre').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(l == '')
    {
        document.getElementById('text').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        //Se crea un objeto con los valores nombre y un booleano llamado activo
        let usu = {
            nombre : l,
            activo : document.getElementById('activo').checked,
        };
        usuarios.push(usu); //Se agregan los valores al final del array con push()
        let filtro = usuarios.filter((u) => u.activo == true); //Se filtran solo aquellos que esten activos
        document.getElementById('text').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        document.getElementById('text2').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        usuarios.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('text').innerHTML += element.nombre + ','; 
        });
        filtro.forEach(element => {
            document.getElementById('text2').innerHTML += element.nombre + ', '; 
        });
    }
}