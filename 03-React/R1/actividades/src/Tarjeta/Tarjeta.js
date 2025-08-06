import './tarjeta.css';

function Tarjeta(props)
{
    return (
        <table className='tarjeta'>
            <tr>
                <td rowSpan={2}> <img src={props.foto} className="foto" alt="logo" /></td>
                <td>{props.nombre} {props.apellido}</td>
            </tr>
            <tr>
                <td>{props.profesion}</td>
            </tr>
        </table>
    );
}

export default Tarjeta;