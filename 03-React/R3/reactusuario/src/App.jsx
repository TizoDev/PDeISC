import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Lista from './components/Lista'
import Creacion from './components/Creacion';
import Detalle from './components/Detalle'
import { useState, useEffect } from 'react';
import {leerUrl} from './leerUrl'

function App() 
{
  const [usuarios, setUsuarios] = useState([]);
  
  useEffect(() => {
    leerUrl('http://localhost:8081/api/usuarios')
    .then(data => setUsuarios(data))
    .catch(error => alert(error));
  }, []);

  return (
    <div>
      <header>
        <nav>
          <div>
            <Link to="/">Inicio</Link>
            <Link to="/creacion">Agregar Usuario</Link>
          </div>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Lista />} />
        <Route path="/creacion" element={<Creacion />} />
        {usuarios.map(usu => {
          return (
          <Route path={`/detalle/${usu.id}`} element={<Detalle usu={usu} />}/>
        )})}
      </Routes>
    </div>
  );
}

export default App;