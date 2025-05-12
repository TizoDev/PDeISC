document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formPalabra').addEventListener('submit', formPalabra);
document.getElementById('formNombresEdad').addEventListener('submit', formNombresEdad);
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
        numeros.sort(); //Se ordena el array
        document.getElementById('numerosText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        numeros.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
    }
}

let elementos = []; //Se crea un array para guardar los valores
function formPalabra(event)
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
        elementos.push(l); //Se agregan los valores al final del array con push()
        elementos.sort(); //Se ordena el array
        document.getElementById('palabraText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        elementos.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('palabraText').innerHTML += element + ','; 
        });
    }
}

let objetos = []; //Se crea un array para guardar los valores
function formNombresEdad(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let n = document.getElementById('nombre2').value;
    let e = document.getElementById('edad').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(n == '' || e == '')
    {
        document.getElementById('text').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }
    if(valido) //En caso de que todo este como corresponda
    {
        //Se crea un objeto con los valores nombre y edad
        let obj = {
            nombre : n,
            edad : parseInt(e),
        };
        objetos.push(obj); //Se agregan los valores al final del array con push()
        objetos.sort((a,b) => a.edad - b.edad); //Se ordenan en base a la edad
        document.getElementById('text').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        objetos.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('text').innerHTML += '<p>' + element.nombre + ', ' + element.edad + '</p>'; 
        });
    }
}