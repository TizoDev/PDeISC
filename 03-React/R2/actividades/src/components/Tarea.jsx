import '../style/tarea.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Tarea(props)
{
    const [completa, setCompleta] = useState(props.completa);
    function invertir()
    {
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
        <div className='tarea'>
            <button onClick={invertir} className='tareaButton'>.</button>
            <h3 className={completa}>{props.id}- {props.titulo} - {props.fecha}</h3>
            <p className='descripcion'>{props.descripcion}</p>
            <p><Link to={`/detalle/${props.id}`}>Ver mas</Link></p>
            <br />
        </div>
    );
}

export default Tarea;