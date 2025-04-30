document.getElementById('registrar').addEventListener('submit', registrar);

function registrar(event)
{
    let inputUsuario = document.getElementById('usuarioInput');
    let inputEmail = document.getElementById('emailInput');
    let inputContra = document.getElementById('contraInput');
    let validarContra = document.getElementById('contraInput2');
    let valido = true;

    if(inputUsuario.value.length === 0 || inputEmail.value.length === 0 || inputContra.value.length === 0 || validarContra.value.length === 0)
    {
        alert('Rellenar todos los Campos');
        event.preventDefault();
        valido = false;
    }
    else if(!(inputContra.value == validarContra.value))
    {
        alert('Contraseñas distintas');
        event.preventDefault();
        valido = false;
    }
    else if(!verificarEmail(inputEmail.value))
    {
        alert('Email Invalido');
        event.preventDefault();
        valido = false;
    }

    if(valido == true)
    {
        alert('Registro Exitoso');
    }

}

function verificarEmail(email)
{
    emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return emailRegex.test(email)
}
