import '../styles/inicio.css'
import Proyecto from './proyecto';
import { useState, useEffect } from 'react';
import { leerUrl } from '../leerUrl.js';

function Inicio() 
{
  const [portafolio, setPortafolio] = useState([
    {
      titulo: 'Cargando',
      subtitulo: 'Cargando',
      sobre_mi: 'Cargando',
      experiencia: 'Cargando'
    }]);
  
  const [proyectos, setProyectos] = useState([]);
  useEffect(() => {
      leerUrl('http://localhost:8081/api/portafolio')
        .then(data => {
          setPortafolio(data);
          document.documentElement.style.setProperty('--back-image', `url("http://localhost:8081${data[0].fondo_imagen}")`);
        })
  }, []);

  useEffect(() => {
    leerUrl('http://localhost:8081/api/proyectos')
      .then(data => setProyectos(data))
  }, []);

  return (
    <div>
        <div id='titulos' className='seccion'>
            <div>
                <h1 id="titulo">{portafolio[0].titulo}</h1>
                <h2 id="subtitulo">{portafolio[0].subtitulo}</h2>
                <div className='buttonsHorizontal'>
                  <a href="#sobre"><button><h3>Sobre mi</h3></button></a>
                  <a href="#proyectos"><button><h3>Mis Proyectos</h3></button></a>
                  <a href="#experiencia"><button><h3>Mi Experiencia</h3></button></a>
                </div>
            </div>
        </div>
        <div id='sobre' className='seccion'>
          <div className="sobre-contenido">
            <div className="sobre-texto">
              <h2>Sobre mi</h2>
              <p id='parrafo1' className='parrafo'>{portafolio[0].sobre_mi}</p>
            </div>
            <div className="sobre-foto">
              <img src={`http://localhost:8081${portafolio[0].perfil_imagen}`}/>
            </div>
          </div>
        </div>

        <div id='experiencia' className='seccion'>
            <h2>Mi Experiencia</h2>
            <p id='parrafo3' className='parrafo'>{portafolio[0].experiencia}</p>
        </div>

        <div id='proyectos' className='seccion'>
          <h2>Mis Proyectos</h2>
          <div className="grid-proyectos">
            {proyectos.map(pro => {
              return(<Proyecto
                id={pro.id}
                titulo={pro.titulo}
                descripcion={pro.descripcion}
                imagen={pro.imagen}
                 />);
            })}
          </div>
        </div>
    </div>
  );
}

export default Inicio