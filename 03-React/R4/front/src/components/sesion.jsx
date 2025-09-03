import '../styles/sesion.css'
import axios from 'axios';

function Sesion() 
{
  async function iniciarSesion(e)
  {
    e.preventDefault();
    let nombre = document.getElementById("nombre").value;
    let password = document.getElementById("password").value;
    await axios.post("https://tizodevgithubio-production.up.railway.app/api/inicioSesion", {
      nombre,
      password
    })
    .then(response => response.json())
    .then(data => {
      if(data === true)
      {
        localStorage.setItem('usuario', nombre);
        window.location.href = "/";
      }
      else document.getElementById('errores').innerHTML = 'contraseña o nombre incorrectos';
    })
    .catch(error => {alert(error)});
  }

  return (
    <div className="login-container">
        <h2>Iniciar Sesión como Administrador</h2>
        <form className="login-form" onSubmit={iniciarSesion}>
            <label htmlFor="nombre">Nombre:</label>
            <input type="text" id="nombre" required/>

            <label htmlFor="password">Contraseña:</label>
            <input type="password" id="password" required/>

            <button type="submit">Iniciar Sesión</button>
            <div id="errores"></div>
        </form>
    </div>
  );
}

export default Sesion