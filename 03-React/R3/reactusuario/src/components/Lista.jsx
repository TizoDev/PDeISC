import { useState, useEffect } from 'react';
import {leerUrl} from '../leerUrl'
import { Link } from 'react-router-dom';

function Lista()
{
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
      leerUrl('http://localhost:8081/api/usuarios')
        .then(data => setUsuarios(data))
        .catch(error => alert(error));
    }, []);
  
    return (
      <div className="container mx-auto p-6 grid gap-6">
        {usuarios.map(usuario => {
          return (
            <div className="usuario bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <p className="text-lg font-semibold text-gray-800 mb-2">{usuario.nombre} {usuario.apellido}</p>
              <p className="text-gray-600">Dirección: {usuario.direccion}</p>
              <p className="text-gray-600">Teléfono: {usuario.telefono}</p>
              <p className="text-gray-600">Fecha de Nacimiento: {usuario.fecha_nacimiento.split("T")[0]}</p>
              <p className="text-gray-600">Email: {usuario.email}</p>
              <div className="mt-4">
                <Link to={`/detalle/${usuario.id}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition-colors duration-200">Editar</Link>
              </div>
            </div>
          );
        })}
      </div>
    );
    
}

export default Lista