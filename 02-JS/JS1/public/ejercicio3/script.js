document.getElementById('formColores').addEventListener('submit', formColores);
document.getElementById('formTareas').addEventListener('submit', formTareas);
document.getElementById('formUsuarios').addEventListener('submit', formUsuarios);
//Se agregan los eventos de submit a los formularios

let colores = []; //Se crea un array para guardar los valores
function formColores(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let c1 = document.getElementById('color1').value;
    let c2 = document.getElementById('color2').value;
    let c3 = document.getElementById('color3').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(c1 == '' || c2 == '' || c3 == '')
    {
        document.getElementById('colorText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }

    if(valido) //En caso de que todo este como corresponda
    {
        colores.unshift(c1); //Se agregan los valores al principio del array con unshift()
        colores.unshift(c2);
        colores.unshift(c3);
        document.getElementById('colorText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        colores.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('colorText').innerHTML += element + ', '; 
        });
    }
}

let tareas = []; //Se crea un array para guardar los valores
function formTareas(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let normal = document.getElementById('tareaNormal').value;
    let urgente = document.getElementById('tareaUrgente').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(normal == '' && urgente == '')
    {
        document.getElementById('tareaText').innerHTML = "Rellenar al menos un campo";
        valido = false; //En caso de que el formulario no sea valido
    }

    if(valido) //En caso de que todo este como corresponda
    {
        if(normal != '') tareas.push(normal); //Se agrega el final
        if(urgente != '') tareas.unshift(urgente); //Se agrega al inicio

        document.getElementById('tareaText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        tareas.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('tareaText').innerHTML += element + ', '; 
        });
    }
}

let usuarios = []; //Se crea un array para guardar los valores
function formUsuarios(event)
{
    event.preventDefault(); //Se previene que reinicie la pagina al dar click en el boton
    
    //Se crean variables para almacenar los valores
    let us = document.getElementById('usuario').value;

    let valido = true; //Se revisa si el formulario es valido, comprobando que los campos tengan algun valor
    if(us == '')
    {
        document.getElementById('usuarioText').innerHTML = "Rellenar todos los campos";
        valido = false; //En caso de que el formulario no sea valido
    }

    if(valido) //En caso de que todo este como corresponda
    {
        usuarios.unshift(us); //Se agregan los valores al principio del array con unshift()
        document.getElementById('usuarioText').innerHTML = ''; //Se vacia la etiqueta p para mostrar los valores
        usuarios.forEach(element => { //Se muestran los valores en el documento
            document.getElementById('usuarioText').innerHTML += element + ', '; 
        });
    }
}