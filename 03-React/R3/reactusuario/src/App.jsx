import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Lista from './components/Lista'
import Creacion from './components/Creacion';
import Detalle from './components/Detalle'
import { useState, useEffect } from 'react';
import {leerUrl} from './leerUrl'

function App() 
{
  //Se guarda la ifnormacion de la api local
  const [usuarios, setUsuarios] = useState([]);
  
  useEffect(() => {
    leerUrl('http://localhost:8081/api/usuarios')
    .then(data => setUsuarios(data))
    .catch(error => alert(error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 shadow-md">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <div className="flex gap-6">
            <Link to="/" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Inicio</Link>
            <Link to="/creacion" className="text-white hover:text-blue-200 transition-colors duration-200 font-medium">Agregar Usuario</Link>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Lista />} />
        <Route path="/creacion" element={<Creacion />} />
        {usuarios.map(usu => { //Se mapea a los usuarios y se le asigna una pestaña de detalle a cada uno
          return (
          <Route path={`/detalle/${usu.id}`} element={<Detalle usu={usu} />}/>
        )})}
      </Routes>
    </div>
  );
}

export default App;