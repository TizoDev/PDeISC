import React from 'react'

function Inicio(prop) 
{
    function guardar(e)
    {
        e.preventDefault();
        let valido = true;
        if(document.getElementById('titulo').value === "")
        {
            valido = false;
        }
        if(document.getElementById('descripcion').value === "")
        {
            valido = false;
        }
        if(valido == true)
        {
            let temp = prop.tarea;
            alert
        }
    }

    return (
        <div>
            <h1>Creacion</h1>
            <form onSubmit={guardar}>
                <label>Titulo</label>
                <br />
                <input type="text" id='titulo'/>
                <br />
                <label>Completada</label> <input type="checkbox" id='completado'/>
                <br />
                <label>Descripcion</label> 
                <br />
                <textarea name="" id="descripcion" rows="10"></textarea>
                <br />
                <button type='submit'>Guardar</button>
            </form>
        </div>
    );
}

export default Inicio