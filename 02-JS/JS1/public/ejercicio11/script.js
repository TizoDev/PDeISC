document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formPalabras').addEventListener('submit', formPalabras);
document.getElementById('formObjetos').addEventListener('submit', formObjetos);

let numeros = [];
function formNumeros(event)
{
    event.preventDefault();
    
    let num = document.getElementById('numero').value;

    let valido = true;
    if(num == '')
    {
        document.getElementById('numerosText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        numeros.push(parseInt(num));
        let filtro = numeros.filter((n) => n>10);
        document.getElementById('numerosText').innerHTML = '';
        document.getElementById('numerosText2').innerHTML = '';
        numeros.forEach(element => {
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
        filtro.forEach(element =>{
            document.getElementById('numerosText2').innerHTML += element + ', '; 
        });
    }
}

let palabras = [];
function formPalabras(event)
{
    event.preventDefault();
    
    let l = document.getElementById('palabra').value;

    let valido = true;
    if(l == '')
    {
        document.getElementById('palabraText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        palabras.push(l);
        let filtro = palabras.filter((p) => p.length>5);
        document.getElementById('palabraText').innerHTML = '';
        document.getElementById('palabraText2').innerHTML = '';
        palabras.forEach(element => {
            document.getElementById('palabraText').innerHTML += element + ','; 
        });
        filtro.forEach(element =>{
            document.getElementById('palabraText2').innerHTML += element + ', '; 
        });
    }
}

let usuarios = [];
function formObjetos(event)
{
    event.preventDefault();
    
    let l = document.getElementById('nombre').value;

    let valido = true;
    if(l == '')
    {
        document.getElementById('text').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        let usu = {
            nombre : l,
            activo : document.getElementById('activo').checked,
        };
        usuarios.push(usu);
        let filtro = usuarios.filter((u) => u.activo == true);
        document.getElementById('text').innerHTML = '';
        document.getElementById('text2').innerHTML = '';
        usuarios.forEach(element => {
            document.getElementById('text').innerHTML += element.nombre + ','; 
        });
        filtro.forEach(element =>{
            document.getElementById('text2').innerHTML += element.nombre + ', '; 
        });
    }
}