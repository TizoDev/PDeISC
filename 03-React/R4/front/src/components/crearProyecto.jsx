import FormProyecto from "./formularioProyecto";
import { Link } from 'react-router-dom';

function Crear() 
{
  function addProyecto(proyecto)
  {
    let titulo = proyecto.titulo;
    let descripcion = proyecto.descripcion;
    let imagen = proyecto.imagen;

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("descripcion", descripcion);
    formData.append("imagen", imagen);

    fetch('https://serverportafolio.vercel.app/api/addProyecto', {
      method: 'POST',
      body: formData
    });
    //Luego vuelve al inicio para que se vean los cambios
    window.location.href = "/";
  }

  if(localStorage.getItem('usuario') != null)
  {
    return (
      <div>
          <FormProyecto subirDatos={addProyecto} datos={{modo:"Crear"}} />
      </div>
    );
  }
  else
  {
    return (
      <div className="flex justify-center items-center">
          <h3>No es posible crear proyectos sin iniciar sesion: </h3>
          <h3><Link to="/iniciar">Iniciar Sesión Aqui</Link></h3>
      </div>
    );
  }
}

export default Crear