import logo from './logo.svg';
import './App.css';

function App() { 

  function probarAPI() {
    fetch('http://localhost:4200/estudiante/pobarConexion')
    .then(response => response.json())
    .then(respuesta => alert(respuesta.respuesta) );
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Inicio de aplicación con ReactJs
        </p>
        <button onClick={probarAPI}>Pobar comunicación con el backend</button>
      </header>
    </div>
  );
}

export default App;
