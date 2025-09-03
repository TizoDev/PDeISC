import '../styles/edicion.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { leerUrl } from '../leerUrl.js';

function Edicion() 
{
  const [portafolio, setPortafolio] = useState([
      {
        titulo: 'Cargando',
        subtitulo: 'Cargando',
        sobre_mi: 'Cargando',
        experiencia: 'Cargando'
      }]);
   useEffect(() => {
      leerUrl('https://serverportafolio.vercel.app/api/portafolio')
      .then(data => {
        setPortafolio(data);
        document.getElementById('titulo').value = data[0].titulo;
        document.getElementById('subtitulo').value = data[0].subtitulo;
        document.getElementById('sobre-mi').value = data[0].sobre_mi;
        document.getElementById('experiencia').value = data[0].experiencia;
      })
    }, []);

  function guardar(e)
  {
    e.preventDefault();
    let titulo = document.getElementById('titulo').value;
    let subtitulo = document.getElementById('subtitulo').value;
    let sobreMi = document.getElementById('sobre-mi').value;
    let experiencia = document.getElementById('experiencia').value;
    let fondo = document.getElementById('fondo').files[0];
    let perfil = document.getElementById('perfil').files[0];

    const formData = new FormData();
    formData.append("titulo", titulo);
    formData.append("subtitulo", subtitulo);
    formData.append("sobre_mi", sobreMi);
    formData.append("experiencia", experiencia);
    if(fondo) formData.append("fondo", fondo);
    if(perfil) formData.append("perfil", perfil);

    fetch("https://serverportafolio.vercel.app/modPortafolio", {
      method: "POST",
      body: formData
    });

    window.location.href = "/";
  }
  if(localStorage.getItem('usuario') != null)
  {
    return (
      <div className="edicion-container">
        <h2>Edición de Página Principal</h2>
        <form className="edicion-form" onSubmit={guardar}>
          <div className="form-group">
            <label>Título:</label>
            <input type="text" placeholder="Título" id='titulo'/>
          </div>
  
          <div className="form-group">
            <label>Subtítulo:</label>
            <input type="text" placeholder="Subtítulo" id='subtitulo'/>
          </div>
  
          <div className="form-group">
            <label>Sobre mí:</label>
            <textarea id="sobre-mi"></textarea>
          </div>
  
          <div className="form-group">
            <label>Experiencia:</label>
            <textarea id="experiencia"></textarea>
          </div>
  
          <div className="form-group">
            <label>Imagen de Fondo:</label>
            <input type="file" id="fondo" />
          </div>
  
          <div className="form-group">
            <label>Imagen de Perfil (Sobre mí):</label>
            <input type="file" id="perfil"/>
          </div>
  
          <button type="submit">Guardar Cambios</button>
          <div id="errores"></div>
        </form>
      </div>
    );
  }    
  else
  {
    return (
      <div className="flex justify-center items-center">
          <h3>No es posible editar la pagina sin iniciar sesion: </h3>
          <h3><Link to="/iniciar">Iniciar Sesión Aqui</Link></h3>
      </div>
    );
  }
}
  
  export default Edicion;
  