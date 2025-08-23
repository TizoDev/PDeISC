import Formulario from './Formulario'

function Creacion()
{    
    function addUsuario(usuario)
    {
      let nombre = usuario.nombre;
      let apellido = usuario.apellido;
      let direccion = usuario.direccion;
      let telefono = usuario.telefono;
      let fecha_nacimiento = usuario.fecha_nacimiento;
      let email = usuario.email;
      fetch('http://localhost:8081/addUsuario',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, apellido, direccion, telefono, fecha_nacimiento, email })
      });
      window.location.href = "/";
    }
  
  return (
    <div>
        <Formulario subirDatos={addUsuario} datos={{modo:"crear"}}/>
    </div>
  );
}

export default Creacion