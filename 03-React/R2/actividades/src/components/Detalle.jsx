import React from 'react'
import '../style/detalle.css'

function Detalle(props) 
{
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    let tarea = tareas.find(tar => tar.id === props.id);

    let comp = false;
    if(tarea.completa === 'true') comp = true;

    function editar()
    {
        var edi = document.getElementsByClassName('editar');
        for(let i=0; i<edi.length; i++) 
        {
            edi[i].style.display = 'block';
        }
        var lect = document.getElementsByClassName('lectura');
        for(let i=0; i<lect.length; i++) 
        {
            lect[i].style.display = 'none';
        }

        document.getElementById('completado').disabled = false;
    }

    function descargar() 
    {
        let contenido = `${tarea.titulo} \n ${tarea.descripcion}`;
        const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = tarea.titulo;
        enlace.style.display = 'none';
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    }

    function eliminar()
    {
        tareas.splice(tarea.id, 1)
        let i = 0;
        tareas.map(tar =>{
            if(tar.id != i) tar.id = i;
            i++;
        });

        localStorage.setItem('tareas', JSON.stringify(tareas));
        window.location.href = "/";
    }

    function guardar()
    {
        if(document.getElementById('descripcion').value === "" || document.getElementById('titulo').value === "")
        {

        }
        else
        {
            const fechaActual = new Date();
            tarea.titulo = document.getElementById('titulo').value;
            tarea.completa = `${document.getElementById('completado').checked}`
            tarea.descripcion = document.getElementById('descripcion').value;
            tarea.fecha = `${fechaActual.getDate()}/${fechaActual.getMonth()+1}/${fechaActual.getFullYear()}`;
            localStorage.setItem('tareas', JSON.stringify(tareas));
            location.reload();
        }
    }

    return (
        <div>
            <h1 className='lectura'>{tarea.titulo} - {tarea.fecha}</h1>
            <textarea id="titulo" rows="1" className='editar'>{tarea.titulo}</textarea>
            <h3>Completada: <input disabled type="checkbox" id='completado' defaultChecked={comp} /></h3>
            <p className='lectura'>{tarea.descripcion}</p>
            <textarea id="descripcion" rows="10" className='editar'>{tarea.descripcion}</textarea>
            <br />
            <button onClick={editar} className='lectura'>Editar Tarea</button>
            <button onClick={descargar} className='lectura'>Descargar Tarea</button>
            <button onClick={eliminar} className='lectura'>Eliminar Tarea</button>
            <button onClick={guardar} className='editar'>Guardar Cambios</button>
        </div>
    );
}

export default Detalle