import React from 'react'
import Tarea from './Tarea'

function Inicio() 
{
  let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

    function descargar() 
    {
        let contenido='';
        //Guarda el contenido en un String
        tareas.map(tarea =>{
          contenido += `-${tarea.titulo} \n ${tarea.descripcion}\n`;
        });
  
        //Crea un archivo con el contenido y lo descarga
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
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Inicio</h1>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Lista de Tareas</h2>
            <button onClick={descargar} className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Descargar</button>
          </div>
          <div className="space-y-4">
            {tareas.map(tar => (
              <Tarea
                key={tar.id}
                id={tar.id}
                completa={tar.completa}
                titulo={tar.titulo}
                descripcion={tar.descripcion}
                fecha={tar.fecha}
              />
            ))}
          </div>
        </div>
      );
}

export default Inicio