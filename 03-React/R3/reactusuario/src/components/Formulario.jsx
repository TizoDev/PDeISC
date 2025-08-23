function Formulario({ subirDatos, datos })
{      
    let defaultValues = {
        nombre: '',
        apellido: '',
        direccion: '',
        telefono: '',
        fecha_nacimiento: '',
        email: ''
    }
    if(datos.modo === "editar")
    {
        defaultValues = {
            nombre: datos.usuario.nombre,
            apellido: datos.usuario.apellido,
            direccion: datos.usuario.direccion,
            telefono: datos.usuario.telefono,
            fecha_nacimiento: datos.usuario.fecha_nacimiento.split("T")[0],
            email: datos.usuario.email
        }
    }
    
    function validar(e)
    {
        e.preventDefault();
        document.getElementById('error').innerHTML = '';
        let error = document.getElementById('error');
        let valido = true;
        let nombre = document.getElementById('nombre').value;
        let apellido = document.getElementById('apellido').value;
        let direccion = document.getElementById('direccion').value;
        let telefono = document.getElementById('telefono').value;
        let fecha_nacimiento = document.getElementById('fecha').value;
        let email = document.getElementById('email').value;
        if(!verificarText(nombre))
        {
            valido = false;
            error.innerHTML = 'Ingresar un nombre valido';
        }
        if(!verificarText(apellido))
        {
            valido = false;
            error.innerHTML = 'Ingresar un apellido valido';
        }
        if(!verificarTextconNumeros(direccion))
        {
            valido = false;
            error.innerHTML = 'Ingresar una direccion valida';
        }
        if(!verificarTelef(telefono))
        {
            valido = false;
            error.innerHTML = 'Ingresar un telefono valido';
        }
        if(!verificarEmail(email))
        {
            valido = false;
            error.innerHTML = 'Ingresar un email valido';
        }
        if(valido)
        {
            let usuario = {
                nombre: nombre,
                apellido: apellido,
                direccion: direccion,
                telefono: telefono,
                fecha_nacimiento: fecha_nacimiento,
                email: email
            }
            subirDatos(usuario);
        }
    }

    function verificarEmail(email)//True si es valido
    {
        let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
        return emailRegex.test(email);
    }

    function verificarTelef(tel)//True si es valido
    {
        //Utiliza un regex para verificar que el telefono cumpla con los requisitos
        let telRegex = /^(\d{3}[-\s]?\d{3}[-\s]?\d{4})$/;
        return telRegex.test(tel);
    }

    function verificarText(text)
    {
        let textRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s']+$/;
        return textRegex.test(text);
    }

    function verificarTextconNumeros(texto) 
    {
        let regex = /^[0-9a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s']+$/;
        return regex.test(texto);
    }

    return (
        <div>
            <form onSubmit={validar}>
                <label>Nombre</label> 
                <input type="text" id="nombre" required defaultValue={defaultValues.nombre}/>
                <br />
                <label>Apellido</label> 
                <input type="text" id="apellido" required defaultValue={defaultValues.apellido}/>
                <br />
                <label>Direccion</label> 
                <input type="text" id="direccion" required defaultValue={defaultValues.direccion}/>
                <br />
                <label>Telefono</label> 
                <input type="tel" id="telefono" required defaultValue={defaultValues.telefono}/>
                <br />
                <label>Fecha de Nacimiento</label> 
                <input type="date" id="fecha" required defaultValue={defaultValues.fecha_nacimiento}/>
                <br />
                <label>Email</label> 
                <input type="email" id="email" required defaultValue={defaultValues.email}/>
                <br />
                <button type="submit">Guardar</button>
            </form>
            <div id="error"></div>
        </div>
    );
}

export default Formulario