import { Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { leerUrl } from './leerUrl.js';
import Inicio from './components/Inicio';
import Edicion from './components/edicion';
import Sesion from './components/sesion';
import Crear from './components/crearProyecto';
import Editar from './components/editarProyecto';
import './App.css'

function App() 
{
  let usuario = localStorage.getItem('usuario');
  let sesionIniciada = usuario != null;
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
      leerUrl('http://localhost:8081/api/proyectos')
        .then(data => setProyectos(data))
    }, []);

  function cerrarSesion()
  {
    localStorage.clear();
    sesionIniciada = false;
    window.location.href = "/";
  }

  return (
    <div>
      <header className="header">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/edit" className={`nav-link ${sesionIniciada}`}>Edición</Link>
        <Link to="/crear" className={`nav-link ${sesionIniciada}`}>Crear Proyecto</Link>
        <Link to="/iniciar" className={`nav-link ${!sesionIniciada}`}>Iniciar Sesión</Link>
        <Link className={`nav-link ${sesionIniciada}`} onClick={cerrarSesion}>Cerrar Sesión</Link>
      </header>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/edit" element={<Edicion />} />
        <Route path="/crear" element={<Crear />} />
        <Route path="/iniciar" element={<Sesion />} />
        {proyectos.map(pro => { //Se mapea a los proyectos y se le asigna una pestaña a cada uno
          return (
            <Route path={`/proyecto/${pro.id}`} element={<Editar pro={pro} />}/>
            )
          })}
      </Routes>
    </div>
  );
}

export default App