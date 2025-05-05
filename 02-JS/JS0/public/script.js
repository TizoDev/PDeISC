document.getElementById('registrar').addEventListener('submit', registrar);
document.getElementById('hijos').addEventListener('change', mostrarHijos);
let usuarios = 0;

function registrar(event)
{
    event.preventDefault()
    let valido = true;
    let nombre = document.getElementById('nombreInput').value;
    let apellido = document.getElementById('apellidoInput').value;
    let nacimiento = document.getElementById('nacimientoInput').value;
    let sexo = document.querySelector('input[name="sexo"]:checked').value;
    let documento = document.getElementById('documentoInput').value;
    let estado = document.getElementById("estadoInput").value;
    let nacionalidad = document.getElementById("nacioInput").value;
    let telefono = document.getElementById("telefonoInput").value;
    let hijo = document.getElementById("hijos");
    let cantHijos = document.getElementById("hijosInput").value;
    let email = document.getElementById("emailInput").value;

    if(nombre == '' || apellido == '' || nacimiento == '' || documento == '' || nacionalidad == '' || telefono == '' || email == '')
    {
        alert("Completar todos los campos");
        valido = false;
    }
    if(hijo.checked && cantHijos == '')
    {
        alert("Completar todos los campos");
        valido = false;
    }
    if(!verificarEmail(email))
    {
        alert("Ingresar un Email valido");
        valido = false;
    }
    if(!checkTelef(telefono))
    {
        alert("Ingresar un Telefono valido de la siguiente manera: 123 456 7899");
        valido = false;
    }
    if(verificarText(nombre))
    {
        alert("Ingresar un Nombre valido");
        valido = false;
    }
    if(verificarText(apellido))
    {
        alert("Ingresar un Apellido valido");
        valido = false;
    }
    if(verificarNum(documento))
    {
        alert("Ingresar un Documento valido");
        valido = false;
    }

    if(valido)
    {
        let info = '<div class="usuario"><p style="display: inline-block;">' + nombre + ' ' + apellido +'</p>';
        info += '<button onclick="mostrarUsuarioInfo('+ usuarios +')" class="botonDesplegable">V</button><div class="usuarioInfo" id="us' + usuarios + '">';
        info += '<p>Fecha Nacimiento: ' + nacimiento + '</p>';
        info += '<p>Sexo: ' + sexo +'</p>';
        info += '<p>Documento: ' + documento + '</p>';
        info += '<p>Estado Civil: ' + estado + '</p>';
        info += '<p>Nacionalidad: ' + nacionalidad + '</p>';
        info += '<p>Telefono: ' + telefono + '</p>';
        if(hijo.checked) info += '<p>Hijos: ' + cantHijos + '</p>';
        else info += '<p>Hijos: No</p>';
        info += '<p>Email: ' + email + '</p></div></div>';
        document.getElementById('usuariosSection').innerHTML += info;
        usuarios++;
        alert("Guardado Existoso");
    }
}  

function verificarEmail(email)
{
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return emailRegex.test(email)
}

function checkTelef(tel)
{
    let telRegex = /[0-9]{3}\s[0-9]{3}\s[0-9]{4}/g;
    return telRegex.test(tel);

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

function verificarText(s)
{
    //Revisa cada caracter para asegurarse que entre en el estandar
    //En caso de no estar en el estandar devuelve true
    for(let i=0; i<s.length; i++)
    {
        if(!/[a-zA-Z]/.test(s[i]) && s[i] !== 'ñ') return true;
    }
    return false;
}

function verificarNum(s)
{
    for(let i=0; i<s.length; i++)
    {
        if(/[a-zA-Z]/.test(s[i])) return true;
    }
    return false;
}