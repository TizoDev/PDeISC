import React, { useState } from 'react';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Inicio from './components/Inicio'
import Detalle from './components/Detalle'
import Creacion from './components/Creacion'

function App() {
  const [tareas, setTarea] = useState([{
    completa: 'true',
    titulo: 'Tarea1',
    descripcion: 'Si',
    fecha: 'ayer'
  },
  {
    completa: 'true',
    titulo: 'Tarea2',
    descripcion: 'no',
    fecha: 'hoy'
  },
]);
  return (
    <div>
      <nav>
        <p><Link to="/">Inicio</Link></p>
        <p><Link to="/detalle">Detalle</Link></p>
        <p><Link to="/creacion">Creacion</Link></p>
      </nav>
      <div>

      </div>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/detalle" element={<Detalle />} />
        <Route path="/creacion" element={<Creacion />} />
      </Routes>
    </div>
  );
}

export default App;