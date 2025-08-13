import React from 'react'

function Inicio() 
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
            let temp = localStorage.getItem('tareas');
            const fechaActual = new Date();

            let tar = {
                completa: `${document.getElementById('completado').checked}`,
                titulo: document.getElementById('titulo').value,
                descripcion: document.getElementById('descripcion').value,
                fecha: `${fechaActual.getDate()} - ${fechaActual.getMonth() + 1} - ${fechaActual.getFullYear()}`
            };

            tar = JSON.stringify(tar);
            tar = tar.slice(1);
            temp.pop();
            localStorage.setItem('tareas', JSON.stringify(temp));
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