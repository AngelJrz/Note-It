import { Link } from 'react-router-dom';
import loginScreen from './Screens/login.js';
import HomeScreen from './Screens/homescreen.js';
import RegistroScreen from './Screens/registro.js';
import ValidarCodigo from './Screens/validarCodigo.js';
import { BrowserRouter, Route } from 'react-router-dom';
import logouv from './images/logouv.jpg';

function App() { 

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/">
              <img src={logouv} alt="Logo" />
            </Link>
          </div>
          <div>
            <Link to="/login">Inicia sesión</Link>
          </div>
        </header>

        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/login" component={loginScreen}></Route>
          <Route path="/registro" component={RegistroScreen}></Route>
          <Route path="/validar-codigo/:usuario" component={ValidarCodigo}></Route>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
