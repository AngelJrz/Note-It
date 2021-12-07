import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useCarreras } from "../../hooks/useCarreras";
import { useMaterias } from "../../hooks/useMaterias";
import useTemas from "../../hooks/useTemas";
import Boton from "../../components/Boton/index.js";
import { OP_NOTAS_UTILES, OP_NOTAS_MAS_VISUALIZADAS } from '../../utilerias/constantes.js';
import './index.css'

function Filtros(props) {
    const { texto= "", carrera = "", materia = "", tema = "", op = '' } = props;

    const history = useHistory();

    const { carreras } = useCarreras();
    const { materias, setCarrera } = useMaterias();
    const { temas, setMateria } = useTemas();

    const [filtros, setFiltros] = useState({
      texto,
      carrera,
      materia,
      tema,
      op,
    });

    useEffect(() => {
      setFiltros({ texto, carrera, materia, tema, op });
    }, [texto, carrera, materia, tema, op]);

    const cambioDeFiltro = (e) => {

      const nombre = e.target.name;
      const valor = e.target.value;

      setFiltros({
        ...filtros,
        [e.target.name]: e.target.value,
      });

      if (nombre === "carrera") {
        setCarrera(valor);
      } else if (nombre === "materia") {
        setMateria(valor);
      }
      
    };

    const buscarFiltros = (event) => {
        event.preventDefault();

        var query = `?q=${texto}`;

        console.log("FILTROS: ", filtros);

        if (filtros.carrera) {
          query += `&carrera=${filtros.carrera}`;
        }

        if (filtros.materia) {
          query += `&mareria=${filtros.materia}`;
        }

        if (filtros.tema) {
          query += `&tema=${filtros.tema}`;
        }

        if (filtros.op) {
          query += `&op=${filtros.op}`;
        }

        history.push({
          pathname: "/busqueda",
          search: query,
        });
    }

    return (
      <form onSubmit={buscarFiltros} className="formulario-filtros">
        <fieldset>
          <label htmlFor="carrera" className="label">
            Carrera
          </label>
          <select
            id="carreras"
            name="carrera"
            value={filtros.carrera}
            onChange={cambioDeFiltro}
          >
            <option value="" selected disabled>
              Selecciona una carrera
            </option>
            {carreras.map((carrera) => (
              <option key={carrera.id} value={carrera.id}>
                {carrera.nombre}
              </option>
            ))}
          </select>

          <label htmlFor="materia">Materia</label>
          <select
            id="materias"
            name="materia"
            value={filtros.materia}
            onChange={cambioDeFiltro}
          >
            <option value="" selected disabled>
              Selecciona una materia
            </option>
            {materias &&
              materias.map((materia) => (
                <option key={materia.id} value={materia.id}>
                  {materia.nombre}
                </option>
              ))}
          </select>

          <label htmlFor="tema">Tema</label>
          <select
            id="temas"
            name="tema"
            value={filtros.tema}
            onChange={cambioDeFiltro}
          >
            <option value="" selected disabled>
              Selecciona un tema
            </option>
            {temas &&
              temas.map((tema) => (
                <option key={tema.id} value={tema.id}>
                  {tema.nombre}
                </option>
              ))}
          </select>

          <label>
            <input
              type="radio"
              id="utiles"
              name="op"
              value="1"
              checked={filtros.op === OP_NOTAS_UTILES}
              onChange={cambioDeFiltro}
            />
            Más útiles
          </label>
          <label>
            <input
              type="radio"
              id="masVisualizadas"
              name="op"
              value="2"
              checked={filtros.op === OP_NOTAS_MAS_VISUALIZADAS}
              onChange={cambioDeFiltro}
            />
            Más visualizadas
          </label>
        </fieldset>

        <div className="boton-container">
          <Boton texto="Buscar" tipo="boton principal w-50" />
        </div>
      </form>
    );
}

export default React.memo(Filtros);