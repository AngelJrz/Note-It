import LoginScreen from './Screens/login/login.js';
import HomeScreen from './Screens/homescreen/homescreen.js';
import { BrowserRouter, Route } from 'react-router-dom';
import RegistroScreen from './Screens/Registro/index.js';
import ValidarCodigo from './Screens/ValidarCodigo/index.js';
import Header from './components/header/header.js';
import CrearNota from './Screens/CrearNota/index.js';
import DetallesNota from './Screens/DetallesNota/DetallesNota.js';
import {EstudianteContextProvider}  from './context/UserContext.js';
import PerfilEstudiante from './Screens/perfilEstudiante/PerfilEstudiante.js';
import DetallesNota from './Screens/DetallesNota/DetallesNota.js';

function App() { 
  return (
    <EstudianteContextProvider>
      <BrowserRouter>
        <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet'/>
        <div className="grid-container">
          <Header/>
          <main>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path="/login" component={LoginScreen}></Route>
            <Route path="/registro" component={RegistroScreen}></Route>
            <Route path="/Nota/:id" component={DetallesNota} exact></Route>
            <Route path="/validar-codigo" component={ValidarCodigo}></Route>
            <Route path="/crear-nota" component={CrearNota}></Route>
            <Route path="/estudiante/:usuario" component={PerfilEstudiante}></Route>
          </main>
        </div>
      </BrowserRouter>
    </EstudianteContextProvider>
  );
}

export default App;
