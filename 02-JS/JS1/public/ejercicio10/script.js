document.getElementById('formLetras').addEventListener('submit', formLetras);

let letras = [];
function formLetras(event)
{
    event.preventDefault();
    
    let l = document.getElementById('letra').value;

    let valido = true;
    if(l == '')
    {
        document.getElementById('letraText').innerHTML = "Rellenar todos los campos";
        valido = false;
    }
    if(verificarText(l))
    {
        document.getElementById('letraText').innerHTML = "Porfavor no Utilizar caracteres especiales";
        valido = false;
    }
    if(valido)
    {
        letras.push(l);
        document.getElementById('letraText').innerHTML = '';
        letras.forEach(element => {
            document.getElementById('letraText').innerHTML += element + ', '; 
        });
    }
}
