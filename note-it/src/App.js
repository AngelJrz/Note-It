import LoginScreen from './Screens/login/login.js';
import HomeScreen from './Screens/homescreen/homescreen.js';
import { BrowserRouter, Route } from 'react-router-dom';
import RegistroScreen from './Screens/Registro/index.js';
import ValidarCodigo from './Screens/ValidarCodigo/index.js';
import Header from './components/header/header.js';

function App() { 

  return (
    <BrowserRouter>
      <div className="grid-container">
        <Header/>
        <main>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/login" component={LoginScreen}></Route>
          <Route path="/registro" component={RegistroScreen}></Route>
          <Route path="/validar-codigo" component={ValidarCodigo}></Route>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
