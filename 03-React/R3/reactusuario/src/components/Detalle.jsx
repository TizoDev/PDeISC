import Formulario from "./Formulario";

function Detalle({usu}) 
{
    //Llama al servidor y le pasa la id correspondiente para eliminar a un usuario de la base de datos
    function eliminar()
    {
        let id = usu.id;
        fetch('http://localhost:8081/delUsuario',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        //Una vez eliminado vuelve al inicio
        window.location.href = "/";
    }

    //Obtiene los datos modificados de un usuario y los guarda en el servidor
    function guardar(usuario)
    {
        let id = usu.id;
        let nombre = usuario.nombre;
        let apellido = usuario.apellido;
        let direccion = usuario.direccion;
        let telefono = usuario.telefono;
        let fecha_nacimiento = usuario.fecha_nacimiento;
        let email = usuario.email;
        fetch('http://localhost:8081/modUsuario',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, nombre, apellido, direccion, telefono, fecha_nacimiento, email })
        });
        //Luego vuelve al inicio para que se vean los cambios
        window.location.href = "/";
    }

    return (
        <div>
            <div className="flex justify-start mb-6">
                <button onClick={eliminar} className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition-colors">Eliminar Usuario</button>
            </div> 
            {/* Se le pasa la funcion guardar como parametro, y luego se pasa que
            se va a usar el formulario para editar y pasa los datos base */}
            <Formulario subirDatos={guardar} datos={{modo:"editar", usuario: usu}}/>
        </div>
      );
      
}

export default Detalle