import Hola from './HolaMundo/holamundo'
import Tarjeta from './Tarjeta/Tarjeta'
import Contador from './Contador/Contador'
import Tareas from './Tareas/Tareas'
import Formulario from './Formulario/Formulario'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hola />
        <br />
        <Tarjeta 
          foto = '/logo192.png'
          nombre = 'Josue'
          apellido = 'Rodrigez'
          profesion = 'Ingeniero'
        />
        <br />
        <Contador />
        <br />
        <Tareas />
        <br />
        <Formulario />
      </header>
    </div>
  );
}

export default App;
