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
    <div>
      {usuarios.map( usuario => {
        return (
        <div className='usuario'>
          <p><strong>{usuario.nombre} {usuario.apellido}</strong></p>
          <p>Direccion: {usuario.direccion}</p>
          <p>Telefono: {usuario.telefono}</p>
          <p>Fecha de Nacimiento: {usuario.fecha_nacimiento.split("T")[0]}</p>
          <p>Email: {usuario.email}</p>
          <Link to={`/detalle/${usuario.id}`}>Editar</Link>
        </div> );
      })}
    </div>
  );
}

export default Lista