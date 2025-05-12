document.getElementById('formElementos').addEventListener('submit', formElementos);
document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formPrecios').addEventListener('submit', formPrecios);
//Se agregan los eventos de submit a los formularios

let elementos = []; //Se crea un array para guardar los valores
function formElementos(event)
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
        let reduc = elementos.reduce((suma, p) => suma + p, ''); //Se suman todos los elementos del array
        document.getElementById('palabraText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        document.getElementById('palabraText2').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        elementos.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('palabraText').innerHTML += element + ','; 
        });
        document.getElementById('palabraText2').innerHTML = reduc; //Se muestra la suma
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
        let reduc = numeros.reduce((multi, p) => multi * p, 1); //Se multiplican todos los elementos del array
        document.getElementById('numerosText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        document.getElementById('numerosText2').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        numeros.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
        document.getElementById('numerosText2').innerHTML = reduc; //Se muestra la multiplicacion
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
        //Se crea un objeto con el valor de precio
        let obj = {
            precio : parseInt(num),
        };
        precios.push(obj);
        let total = precios.reduce((tot, p) => tot + p.precio, 0); //Se suman todos los precios
        document.getElementById('precioText').innerHTML = 'Precios: ';
        document.getElementById('precioText2').innerHTML = 'Total: ' + total;
        precios.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('precioText').innerHTML += element.precio + ', '; 
        });
        
    }
}