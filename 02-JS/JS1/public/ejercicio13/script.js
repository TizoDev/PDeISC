document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formPalabra').addEventListener('submit', formPalabra);
document.getElementById('formNombresEdad').addEventListener('submit', formNombresEdad);

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
        numeros.sort();
        document.getElementById('numerosText').innerHTML = '';
        numeros.forEach(element => {
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
    }
}

let elementos = [];
function formPalabra(event)
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
        elementos.push(l);
        elementos.sort();
        document.getElementById('palabraText').innerHTML = '';
        elementos.forEach(element => {
            document.getElementById('palabraText').innerHTML += element + ','; 
        });
    }
}

let objetos = []
function formNombresEdad(event)
{
    event.preventDefault();
    
    let n = document.getElementById('nombre2').value;
    let e = document.getElementById('edad').value;

    let valido = true;
    if(n == '' || e == '')
    {
        document.getElementById('text').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(valido)
    {
        let obj = {
            nombre : n,
            edad : parseInt(e),
        };
        objetos.push(obj);
        objetos.sort((a,b) => a.edad - b.edad);
        document.getElementById('text').innerHTML = '';
        objetos.forEach(element => {
            document.getElementById('text').innerHTML += '<p>' + element.nombre + ', ' + element.edad + '</p>'; 
        });
    }
}