import React from 'react'
import '../style/detalle.css'

function Detalle(props) 
{
  let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
  let tarea = tareas.find(tar => tar.id === props.id);
  //Busca la tarea que tenga la id que se pasa por parametro
  //Guarda si la tarea esta completa de manera local
  let comp = false;
  if(tarea.completa === 'true') comp = true;

  function editar()
  {
    //Oculta las etiquetas que no hacen falta para la edicion y muestra las que si
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
    //Crea un txt con la informacion y lo descarga
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
    //Elimina la tarea del array y actualiza las id para que concuerden con el nuevo orden
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
    //Valida los datos de entrada
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
    if(valido)
    {
      //Actualiza la tarea
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
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg border border-gray-200 space-y-6">
          <h1 className="lectura text-2xl font-bold text-gray-800">
            {tarea.titulo} <span className="text-gray-500 text-lg">- {tarea.fecha}</span>
          </h1>
          <textarea id="titulo" rows="1" className="editar w-full border rounded-lg p-2 text-lg font-semibold text-gray-800 focus:ring focus:ring-blue-300" defaultValue={tarea.titulo} />
          <h3 className="text-gray-700 flex items-center gap-2">
            Completada:
            <input disabled type="checkbox" id="completado" defaultChecked={comp} className="h-5 w-5 text-green-600" />
          </h3>
          <p className="text-gray-700 lectura">{tarea.descripcion}</p>
          <textarea id="descripcion" rows="10" className="editar w-full border rounded-lg p-2 text-gray-700 focus:ring focus:ring-blue-300" defaultValue={tarea.descripcion} />
          <div className="flex flex-wrap gap-3">
            <button onClick={editar} className="lectura bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 transition">Editar Tarea</button>
            <button onClick={descargar} className="lectura bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">Descargar Tarea</button>
            <button onClick={eliminar} className="lectura bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition">Eliminar Tarea</button>
            <button onClick={guardar} className="editar bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">Guardar Cambios</button>
          </div>
        </div>
      );
      
}

export default Detalle