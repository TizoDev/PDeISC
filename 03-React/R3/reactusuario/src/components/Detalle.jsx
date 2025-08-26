import Formulario from "./Formulario";

function Detalle({usu}) 
{
    function eliminar()
    {
        let id = usu.id;
        fetch('http://localhost:8081/delUsuario',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        window.location.href = "/";
    }

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
        window.location.href = "/";
    }

    return (
        <div>
            <div className="flex justify-start mb-6">
                <button onClick={eliminar} className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition-colors">Eliminar Usuario</button>
            </div> 
            <Formulario subirDatos={guardar} datos={{modo:"editar", usuario: usu}}/>
        </div>
      );
      
}

export default Detalle