import { useState } from 'react';
import './Tareas.css';
import Tarea from './Tarea'

function Tareas()
{
    const [tareas, setTareas] = useState([{
        completa: 'true',
        tarea: 'Despertarse'
    },
    {
        completa: 'false',
        tarea: 'Comer'
    },
    {
        completa: 'false',
        tarea: 'Estudiar'
    },
    {
        completa: 'false',
        tarea: 'Dormir'
    },
    ]);

    function agregar()
    {
        let temp = Array.from(tareas);
        let tar = {
            completa: 'false',
            tarea: 'Seguir Durmiendo'
        };
        temp.push(tar)
        setTareas(temp);
    }

    return (
        <div className='lista'>
            <button onClick={agregar} className='agregarButton'> Agregar Tarea </button>
            {tareas.map(tar => {
                return (
                    <Tarea 
                        completa = {tar.completa}
                        tarea = {tar.tarea}
                    />
                )
            })}
        </div>
    );
}

export default Tareas;