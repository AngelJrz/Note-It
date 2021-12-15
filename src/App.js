import LoginScreen from './Screens/login/login.js';
import HomeScreen from './Screens/homescreen/homescreen.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import RegistroScreen from './Screens/Registro/index.js';
import ValidarCodigo from './Screens/ValidarCodigo/index.js';
import Header from './components/header/header.js';
import CrearNota from './Screens/CrearNota/index.js';
import DetallesNota from './Screens/DetallesNota/DetallesNota.js';
import {EstudianteContextProvider}  from './context/UserContext.js';
import PerfilEstudiante from './Screens/perfilEstudiante/PerfilEstudiante.js';
import ResultadoBusqueda from './Screens/ResultadoBusqueda/index.js';
import Crearlista from './Screens/CrearLista/CrearLista.js';
import ListasScreen from './Screens/Listas/ListasScreen.js';
import DetallesLista from './Screens/DetallesLista/DetallesLista.js';
import EditarNota from './Screens/EditarNota/index.js';
import RutaProtegida from './components/RutaProtegida/index.js';
import NotFound from './Screens/NotFound/index.js';

function App() { 
  return (
    <EstudianteContextProvider>
      <BrowserRouter>
        <link
          href="https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css"
          rel="stylesheet"
        />
        <div className="grid-container">
          <Header />
          <main>
            <Route>
              <Switch>
                <Route exact path="/" component={HomeScreen} exact></Route>
                <Route path="/login" component={LoginScreen}></Route>
                <Route path="/registro" component={RegistroScreen}></Route>
                <Route
                  exact
                  path="/Nota/:id"
                  component={DetallesNota}
                  exact
                ></Route>
                <Route path="/validar-codigo" component={ValidarCodigo}></Route>
                <RutaProtegida path="/crear-nota" component={CrearNota} />
                <RutaProtegida path="/crear-lista" component={Crearlista} />
                <RutaProtegida path="/listas" component={ListasScreen} />
                <RutaProtegida
                  path="/detalles-lista"
                  component={DetallesLista}
                />
                <RutaProtegida path="/nota/:id/editar" component={EditarNota} />
                <Route
                  path="/estudiante/:usuario"
                  component={PerfilEstudiante}
                />
                <Route path="/busqueda" component={ResultadoBusqueda}></Route>
                <Route path="*" component={NotFound} />
              </Switch>
            </Route>
          </main>
        </div>
      </BrowserRouter>
    </EstudianteContextProvider>
  );
}

export default App;
