import { useState } from 'react';

function Tarea(props)
{
    const [completa, setCompleta] = useState(props.completa)

    function invertir()
    {
        if(completa === 'true') setCompleta('false');
        else setCompleta('true');
    }

    return (
        <div className='tarea'>
            <button onClick={invertir} className='tareaButton'>.</button>
            <p className={completa}>{props.tarea}</p>
            <br />
        </div>
    );
}

export default Tarea;