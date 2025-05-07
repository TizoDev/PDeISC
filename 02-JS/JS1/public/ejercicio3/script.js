document.getElementById('formColores').addEventListener('submit', formColores);
document.getElementById('formTareas').addEventListener('submit', formTareas);
document.getElementById('formUsuarios').addEventListener('submit', formUsuarios);

let colores = [];
function formColores(event)
{
    event.preventDefault();
    
    let c1 = document.getElementById('color1').value;
    let c2 = document.getElementById('color2').value;
    let c3 = document.getElementById('color3').value;

    let valido = true;
    if(c1 == '' || c2 == '' || c3 == '')
    {
        document.getElementById('colorText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }

    if(valido)
    {
        colores.unshift(c1);
        colores.unshift(c2);
        colores.unshift(c3);
        document.getElementById('colorText').innerHTML = '';
        colores.forEach(element => {
            document.getElementById('colorText').innerHTML += element + ', '; 
        });
    }
}

let tareas = [];
function formTareas(event)
{
    event.preventDefault();
    
    let normal = document.getElementById('tareaNormal').value;
    let urgente = document.getElementById('tareaUrgente').value;

    let valido = true;
    if(normal == '' && urgente == '')
    {
        document.getElementById('tareaText').innerHTML = "Rellenar al menos un campo";
        valido = false;
    }

    if(valido)
    {
        if(normal != '') tareas.push(normal);
        if(urgente != '') tareas.unshift(urgente);

        document.getElementById('tareaText').innerHTML = '';
        tareas.forEach(element => {
            document.getElementById('tareaText').innerHTML += element + ', '; 
        });
    }
}

let usuarios = [];
function formUsuarios(event)
{
    event.preventDefault();
    
    let us = document.getElementById('usuario').value;

    let valido = true;
    if(us == '')
    {
        document.getElementById('usuarioText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }

    if(valido)
    {
        usuarios.unshift(us);
        document.getElementById('usuarioText').innerHTML = '';
        usuarios.forEach(element => {
            document.getElementById('usuarioText').innerHTML += element + ', '; 
        });
    }
}