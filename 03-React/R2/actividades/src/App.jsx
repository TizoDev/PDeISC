import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Inicio from './components/Inicio'
import Detalle from './components/Detalle'
import Creacion from './components/Creacion'
import './App.css';

function App() {
  /*
  const [tareas, setTarea] = useState([{
    id: 0,
    completa: 'true',
    titulo: 'Tarea1',
    descripcion: 'Si',
    fecha: 'ayer'
  },
  {
    id: 1,
    completa: 'true',
    titulo: 'Tarea2',
    descripcion: 'no',
    fecha: 'hoy'
  },
]);
localStorage.setItem('tareas', JSON.stringify(tareas));*/

  return (
    <div>
      <nav>
        <p><Link to="/">Inicio</Link></p>
        <p><Link to="/creacion">Creacion</Link></p>
      </nav>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/creacion" element={<Creacion />} />
        {JSON.parse(localStorage.getItem('tareas')).map(tar => {
          return (
          <Route path={`/detalle/${tar.id}`} element={<Detalle id = {tar.id} />}/>
        )})}
      </Routes>
    </div>
  );
}

export default App;