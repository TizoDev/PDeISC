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
      <header className="bg-gray-900 text-white shadow-md">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center md:justify-end space-x-6 h-16 items-center">
            <Link to="/" className="hover:text-gray-300 transition">Inicio</Link>
            <Link to="/creacion" className="hover:text-gray-300 transition">Crear Nueva Tarea</Link>
          </div>
        </nav>
      </header>
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