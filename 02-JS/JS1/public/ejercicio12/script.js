document.getElementById('formElementos').addEventListener('submit', formElementos);
document.getElementById('formNumeros').addEventListener('submit', formNumeros);
document.getElementById('formPrecios').addEventListener('submit', formPrecios);

let elementos = [];
function formElementos(event)
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
        let reduc = elementos.reduce((suma, p) => suma + p, '');
        document.getElementById('palabraText').innerHTML = '';
        document.getElementById('palabraText2').innerHTML = '';
        elementos.forEach(element => {
            document.getElementById('palabraText').innerHTML += element + ','; 
        });
        document.getElementById('palabraText2').innerHTML = reduc;
    }
}

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
        let reduc = numeros.reduce((multi, p) => multi * p, 1);
        document.getElementById('numerosText').innerHTML = '';
        document.getElementById('numerosText2').innerHTML = '';
        numeros.forEach(element => {
            document.getElementById('numerosText').innerHTML += element + ', '; 
        });
        document.getElementById('numerosText2').innerHTML = reduc;
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
        let obj = {
            precio : parseInt(num),
        };
        precios.push(obj);
        let total = precios.reduce((tot, p) => tot + p.precio, 0);
        document.getElementById('precioText').innerHTML = 'Precios: ';
        document.getElementById('precioText2').innerHTML = 'Total: ' + total;
        precios.forEach(element => {
            document.getElementById('precioText').innerHTML += element.precio + ', '; 
        });
        
    }
}