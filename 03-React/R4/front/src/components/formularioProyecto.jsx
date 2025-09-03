import '../styles/edicion.css'

function FormProyecto({ subirDatos, datos }) 
{
  let defaultValues = {
    titulo: '',
    descripcion: '',
  }
  if(datos.modo === "Editar")
    {
      defaultValues = {
        titulo: datos.proyecto.titulo,
        descripcion: datos.proyecto.descripcion,
      }
    }

    function verificar(e)
    {
      e.preventDefault();
      let titulo = document.getElementById('titulo').value;
      let descripcion = document.getElementById('descripcion').value;
      let imagen = document.getElementById('portada').files[0];

      subirDatos({titulo, descripcion, imagen})
    }

    function eliminar()
    {
      const seguro = window.confirm("¿Estás seguro de querer borrar el proyecto?");
      if (!seguro) return;
      let id = datos.proyecto.id;
        fetch('https://tizodevgithubio-production.up.railway.app/api/delProyecto',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        //Una vez eliminado vuelve al inicio
        window.location.href = "/";
    }

    return (
      <div className="edicion-container">
        <h2>{datos.modo} Proyecto</h2>
        <form className="edicion-form" onSubmit={verificar}>
          <div className="form-group">
            <label>Título:</label>
            <input type="text" placeholder="Título" id='titulo' required defaultValue={defaultValues.titulo} />
          </div>
  
          <div className="form-group">
            <label>Descripcion:</label>
            <input type="text" placeholder="Descripcion" id='descripcion' required defaultValue={defaultValues.descripcion}/>
          </div>
  
          <div className="form-group">
            <label>Imagen de Portada:</label>
            <input type="file" id="portada"/>
          </div>
  
          <button type="submit">Guardar Cambios</button>
          <button type="button" className={`${datos.modo === "Editar"}`} onClick={eliminar}>Eliminar Proyecto</button>
          <div id="errores"></div>
        </form>
      </div>
    );
  }
  
  export default FormProyecto;
  