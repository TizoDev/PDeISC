import React from 'react'

function Inicio() 
{
    function guardar(e)
    {
        e.preventDefault();
        let valido = true;
        document.getElementById('titulo').classList.remove('error');
        document.getElementById('descripcion').classList.remove('error');
        //Si algun campo esta mal lo coloca en rojo
        if(document.getElementById('titulo').value === "")
        {
          valido = false;
          document.getElementById('titulo').classList.add('error');
        }
        if(document.getElementById('descripcion').value === "")
        {
            valido = false;
            document.getElementById('descripcion').classList.add('error');
        }
        if(valido == true)
        {
            let temp = JSON.parse(localStorage.getItem('tareas')) || [];
            const fechaActual = new Date();
            //Crea una nueva tarea con los datos de entrada
            let tar = {
                id: `${temp.length}`,
                completa: `${document.getElementById('completado').checked}`,
                titulo: document.getElementById('titulo').value,
                descripcion: document.getElementById('descripcion').value,
                fecha: `${fechaActual.getDate()}/${fechaActual.getMonth()+1}/${fechaActual.getFullYear()}`
            };

            temp.push(tar);
            localStorage.setItem('tareas', JSON.stringify(temp));
            window.location.href = "/";
            //La agrega a la lista y vuelve a la pestaña de inicio
        }

    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg border border-gray-200 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Creación de Tarea</h1>
          <form onSubmit={guardar} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="titulo" className="font-medium text-gray-700 mb-1">Título</label>
              <input type="text" id="titulo" className="border rounded-lg p-2 focus:ring focus:ring-blue-300 w-full"/>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="completado" className="h-5 w-5 text-green-600"/>
              <label htmlFor="completado" className="font-medium text-gray-700">Completada</label>
            </div>
            <div className="flex flex-col">
              <label htmlFor="descripcion" className="font-medium text-gray-700 mb-1">Descripción</label>
              <textarea id="descripcion" rows="10" className="border rounded-lg p-2 focus:ring focus:ring-blue-300 w-full text-gray-700"></textarea>
            </div>
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">Guardar</button>
          </form>
        </div>
      );
      
}

export default Inicio