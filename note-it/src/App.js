import LoginScreen from './Screens/login/login.js';
import HomeScreen from './Screens/homescreen/homescreen.js';
import { BrowserRouter, Route } from 'react-router-dom';
import RegistroScreen from './Screens/Registro/index.js';
import ValidarCodigo from './Screens/ValidarCodigo/index.js';
import Header from './components/header/header.js';
import { Link } from 'react-router-dom';
import MenuLateral from './components/menuLateral/menulateral.js';
import CrearNota from './Screens/CrearNota/index.js';

function App() { 

  return (
    <BrowserRouter>
      <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet'/>
      <div className="grid-container">
        <Header/>
        <MenuLateral/>
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/registro" component={RegistroScreen}></Route>
          <Route path="/validar-codigo" component={ValidarCodigo}></Route>
          <Route path="/crear-nota" component={CrearNota}></Route>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
