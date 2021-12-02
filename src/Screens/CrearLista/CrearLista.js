import React, {useContext, useState, useEffect} from 'react';
import './CrearLista.css'
import Boton from "../../components/Boton/index.js";
import contextoEstudiante from '../../context/UserContext';
import { useHistory } from "react-router-dom";
import { ServicioCrearLista } from '../../services/listas';
import Notificacion from "../../components/Notificacion/index";
import Progreso from "../../components/Progreso";

export default function Crearlista(){
  const history = useHistory();
  const {datosEstudiante} = useContext(contextoEstudiante);
  const [abrirProgreso, setAbrirProgreso] = useState(false);
  const [datos, setDatos] = useState({
    nombre: '',
    descripcion: ''
  });
  const [notificar, setNotificar] = useState({
    abrir: false,
    mensaje: "",
    tipo: "success",
  });

  useEffect(() => {
    if (datosEstudiante === null) {
        history.push("/");
    }
  }, [])

  const CambioDeDatos = (e) => {
      setDatos({
          ...datos,
          [e.target.name] : e.target.value
      })
  }
  const crearLista = (e) => {
    e.preventDefault();
    
    setAbrirProgreso(true);
    ServicioCrearLista(datos, datosEstudiante.estudiante.id, datosEstudiante.token)
    .then(respuesta => {
      setAbrirProgreso(false);
      if (respuesta.exitoso) {
        setNotificar({
          ...notificar,
          abrir: true,
          mensaje: respuesta.mensaje,
        });
        LimpiarCampos();
      } else {
        setNotificar({
          abrir: true,
          mensaje: respuesta.mensaje,
          tipo: "error",
        });
      }
    }).catch(error => {
      setAbrirProgreso(false);
      alert(error);
    });
  }

  const LimpiarCampos = () => {
   const campoNombre = document.getElementById("nombre");
   const campoDescripcion = document.getElementById("descripcion"); 
   campoNombre.value = "";
   campoDescripcion.value = "";
  }

    return( 
      <div>
        <form className='form formLogin' onSubmit={crearLista}> 
            <div>
                <h1>Crear lista</h1>
            </div>
            <div>
                <label htmlFor='nombre'>Nombre de lista</label>
                <input type='text' id='nombre' placeholder='Ingresa tu usuario' onChange={CambioDeDatos} name="nombre" required>
                </input>
            </div>

            <div className="areaPassword">
                <label htmlFor='descripcion'>Descripción</label>
                <input type='text' id='descripcion' placeholder='Ingresa tu contraseña' onChange={CambioDeDatos} name="descripcion" required>
                </input>
            </div>

            <div className="areaBoton">
                <Boton texto="Crear nueva lista" tipo="boton principal "/>
            </div>
        </form>
        <Progreso abrir={abrirProgreso} />
        <Notificacion notificar={notificar} setNotificar={setNotificar} />
      </div>
    );
}