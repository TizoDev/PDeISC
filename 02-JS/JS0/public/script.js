document.getElementById('registrar').addEventListener('submit', registrar);
document.getElementById('hijos').addEventListener('change', mostrarHijos);

function registrar()
{
    let nombre = document.getElementById('nombreInput').value;
    let apellido = document.getElementById('apellidoInput').value;
    let nacimiento = document.getElementById('nacimientoInput').value;
    let sexo = document.querySelector('input[name="sexo"]:checked').value;
    let documento = document.getElementById('documentoInput').value;
}  

function verificarEmail(email)
{
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return emailRegex.test(email)
}

function mostrarHijos(event)
{
    if(document.getElementById('hijos').checked)
    {
        document.getElementById('hijosSection').style.display = 'block';
    }
    else
    {
        document.getElementById('hijosSection').style.display = 'none';
    }
}

function mostrarUsuarioInfo(n)
{
    if(document.getElementById('us' + n).style.display == 'block')
    {
        document.getElementById('us' + n).style.display = 'none';
    }
    else
    {
        document.getElementById('us' + n).style.display = 'block';
    }
}