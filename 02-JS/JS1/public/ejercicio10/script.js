document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formNombres').addEventListener('submit', formNombres);
document.getElementById('formPrecios').addEventListener('submit', formPrecios);

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
        let num3 = numeros.map((x) => x*3);
        document.getElementById('numerosText').innerHTML = '';
        document.getElementById('numerosText2').innerHTML = '';
        numeros.forEach(element => {
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
        num3.forEach(element =>{
            document.getElementById('numerosText2').innerHTML += element + ', '; 
        });
    }
}

let nombres = [];
function formNombres(event)
{
    event.preventDefault();
    
    let l = document.getElementById('nombre').value;

    let valido = true;
    if(l == '')
    {
        document.getElementById('nombreText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        nombres.push(l);
        document.getElementById('nombreText').innerHTML = '';
        document.getElementById('nombreText2').innerHTML = '';
        nombres.forEach(element => {
            document.getElementById('nombreText').innerHTML += element + ','; 
        });
        let nombresM = nombres.map((m) => m.toUpperCase());
        nombresM.forEach(element => {
            document.getElementById('nombreText2').innerHTML += element + ','; 
        });
    }
}

let precios = [];
function formPrecios(event)
{
    event.preventDefault();
    
    let num = document.getElementById('precio').value;

    let valido = true;
    if(num == '')
    {
        document.getElementById('precioText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        precios.push(parseInt(num));
        let iva = precios.map((x) => x * 1.21);
        document.getElementById('precioText').innerHTML = 'Base: ';
        document.getElementById('precioText2').innerHTML = 'IVA: ';
        precios.forEach(element => {
            document.getElementById('precioText').innerHTML += element + ', '; 
        });
        iva.forEach(element =>{
            document.getElementById('precioText2').innerHTML += element + ', '; 
        });
    }
}