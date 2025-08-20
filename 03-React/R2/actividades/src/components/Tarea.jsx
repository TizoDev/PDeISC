import '../style/tarea.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Tarea(props)
{
    const [completa, setCompleta] = useState(props.completa);
    function invertir()
    {
      //Invierte el boolean que detecta si la tarea esta completa
        let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        const tarea = tareas.find(tar => tar.id === props.id);
        if(tarea.completa === 'true')
        {
            tarea.completa = 'false';
            setCompleta('false');
        }
        else
        {
            tarea.completa = 'true';
            setCompleta('true');
        }

        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    return (
        <div className="bg-white shadow rounded-lg p-4 border border-gray-200 tarea">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-3">
              <button onClick={invertir} className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition"></button>
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                <span className={`titulo ${completa} truncate`}>{props.titulo}</span> - 
                <span className="text-gray-500 text-sm ml-1">{props.fecha}</span>
              </h3>
            </div>
            <p className="descripcion text-gray-700 truncate">{props.descripcion}</p>
            <p><Link to={`/detalle/${props.id}`} className="text-blue-600 hover:text-blue-800 font-medium transition">Ver mas</Link>
            </p>
          </div>
        </div>
      );
      
}

export default Tarea;