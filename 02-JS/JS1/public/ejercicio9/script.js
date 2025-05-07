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

function eliminarLetra()
{
    letras.splice(1, 1);
    document.getElementById('letraText').innerHTML = '';
    letras.forEach(element => {
        document.getElementById('letraText').innerHTML += element + ', '; 
    });
}

function insertar()
{
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
        letras.splice(2, 0, l);
        document.getElementById('letraText').innerHTML = '';
        letras.forEach(element => {
            document.getElementById('letraText').innerHTML += element + ', '; 
        });
    }
}

function reemplazar()
{
    let l = document.getElementById('letra').value;
    let n = document.getElementById('pos').value

    let valido = true;
    if(l == '' || n == '')
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
        letras.splice(parseInt(n), 1, l);
        document.getElementById('letraText').innerHTML = '';
        letras.forEach(element => {
            document.getElementById('letraText').innerHTML += element + ', '; 
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
