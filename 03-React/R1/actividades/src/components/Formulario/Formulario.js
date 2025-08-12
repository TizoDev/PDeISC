import { useState } from "react";
import './Formulario.css'

function Formulario() 
{
    const [nombre, setNombre] = useState('');

    function saludar(e)
    {
        e.preventDefault();
        let nom = document.getElementById("inputNombre").value;
        setNombre(nom);
        document.getElementById("saludo").style.display = 'block';
    }

    return (
        <form onSubmit={saludar} className="formulario">
            <label>Nombre: </label>
            <input type="text" id="inputNombre"/>
            <button type="submit" className="submit">Enviar</button>
            <p id="saludo">Hola {nombre}!!!!</p>
        </form>
    );
}

export default Formulario;