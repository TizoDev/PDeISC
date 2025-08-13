import Hola from './components/HolaMundo/holamundo'
import Tarjeta from './components/Tarjeta/Tarjeta'
import Contador from './components/Contador/Contador'
import Tareas from './components/Tareas/Tareas'
import Formulario from './components/Formulario/Formulario'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Hola />
        <br />
        <Tarjeta 
          foto = '/homero.jpg'
          nombre = 'Homero'
          apellido = 'Simpson'
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
