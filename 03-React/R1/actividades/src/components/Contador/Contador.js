import { useState } from "react";
import './Contador.css'

function Contador()
{
    const [numero, setNumero] = useState(0);

    function aumentar() 
    {
        setNumero(numero + 1);
    }

    function disminuir() 
    {
        setNumero(numero - 1);
    }

    return (
        <div className="contador">
            <h1>{numero}</h1>
            <button onClick={disminuir} className="contadorButton">Disminuir</button>
            <button onClick={aumentar} className="contadorButton">Aumentar</button>
        </div>
    );
}

export default Contador;