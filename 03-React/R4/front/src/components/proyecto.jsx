function Proyecto({id, titulo, descripcion, imagen}) 
{
  let usuario = localStorage.getItem('usuario');
  let sesionIniciada = usuario != null;

  function enviar()
  {
    window.location.href = `/proyecto/${id}`;
  }

  return (
    <div className="proyecto">
        <img id="imagen" alt="Proyecto 1" src={`http://localhost:8081${imagen}`}/>
        <h3 id="titulo">{titulo}</h3>
        <p id="descripcion">{descripcion}</p>
        <button className={`nav-link ${sesionIniciada}`} onClick={enviar}>Editar Proyecto</button>
    </div>
  );
}

export default Proyecto