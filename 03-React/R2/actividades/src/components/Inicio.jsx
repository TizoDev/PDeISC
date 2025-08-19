import React from 'react'
import Tarea from './Tarea'

function Inicio() 
{
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    function descargar() 
    {
        let contenido='';
        tareas.map(tarea =>{
          contenido += `-${tarea.titulo} \n ${tarea.descripcion}\n`;
        });
  
        const blob = new Blob([contenido], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const enlace = document.createElement('a');
        enlace.href = url;
        enlace.download = "Tareas";
        enlace.style.display = 'none';
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
        URL.revokeObjectURL(url);
    }

    return (
        <div>
            <h1>Inicio</h1>
            <div>
                <button onClick={descargar}>Descargar Lista de Tareas</button>
                {tareas.map(tar => {
                    return (
                        <Tarea
                            id = {tar.id}
                            completa = {tar.completa}
                            titulo = {tar.titulo}
                            descripcion = {tar.descripcion}
                            fecha = {tar.fecha}
                        />
                        );})}
            </div>
        </div>
    );
}

export default Inicio