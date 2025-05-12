document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formNombres').addEventListener('submit', formNombres);
document.getElementById('formPrecios').addEventListener('submit', formPrecios);
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
        let num3 = numeros.map((x) => x*3); //Se crea un nuevo array con todos los valores multiplicados por 3
        document.getElementById('numerosText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        document.getElementById('numerosText2').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        numeros.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
        num3.forEach(element => {
            document.getElementById('numerosText2').innerHTML += element + ', '; 
        });
    }
}

let nombres = []; //Se crea un array para guardar los valores
function formNombres(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let l = document.getElementById('nombre').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(l == '')
    {
        document.getElementById('nombreText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(verificarText(l))
    {
        document.getElementById('nombreText').innerHTML = "Porfavor no Utilizar caracteres especiales";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        nombres.push(l); //Se agregan los valores al final del array con push()
        document.getElementById('nombreText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        document.getElementById('nombreText2').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        nombres.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('nombreText').innerHTML += element + ','; 
        });
        let nombresM = nombres.map((m) => m.toUpperCase()); //Se convierten todos los caracteres del array a mayuscula
        nombresM.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('nombreText2').innerHTML += element + ','; 
        });
    }
}

let precios = []; //Se crea un array para guardar los valores
function formPrecios(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let num = document.getElementById('precio').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(num == '')
    {
        document.getElementById('precioText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        precios.push(parseInt(num)); //Se agrega el numero al final del array convirtiendolo a Int
        let iva = precios.map((x) => x * 1.21); //Se le agrega el IVA del 21% usando multiplicacion
        document.getElementById('precioText').innerHTML = 'Base: '; //Se vacian los parrafos
        document.getElementById('precioText2').innerHTML = 'IVA: ';
        precios.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('precioText').innerHTML += element + ', '; 
        });
        iva.forEach(element => {
            document.getElementById('precioText2').innerHTML += element + ', '; 
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
