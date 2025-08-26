import Formulario from './Formulario'

function Creacion()
{   
  //Agrega un usuario a la base de datos
  function addUsuario(usuario)
  {
    //Se sacan los datos del objeto
    let nombre = usuario.nombre;
    let apellido = usuario.apellido;
    let direccion = usuario.direccion;
    let telefono = usuario.telefono;
    let fecha_nacimiento = usuario.fecha_nacimiento;
    let email = usuario.email;
    //Se llama al metodo post del servidor para poder agregar un nuevo usuario
    fetch('http://localhost:8081/addUsuario',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, apellido, direccion, telefono, fecha_nacimiento, email })
    });
    window.location.href = "/";
  }
  
  return (
    <div>
      {/*Se pasa como parametro la funcion de addUsuario para que el formulario
      sepa que hacer con los datos, y se le pasa que se va utilizar para crear un nuevo usuario*/}
      <Formulario subirDatos={addUsuario} datos={{modo:"crear"}}/>
    </div>
  );
}

export default Creacion