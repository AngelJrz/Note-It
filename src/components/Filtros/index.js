import React, { useState } from 'react';
import { useCarreras } from "../../hooks/useCarreras";
import { useMaterias } from "../../hooks/useMaterias";
import useTemas from "../../hooks/useTemas";
import Boton from "../../components/Boton/index.js";

export default function Filtros() {
    const { carreras } = useCarreras();
    const { materias, setCarrera } = useMaterias();
    const { temas, setMateria } = useTemas();


    const filtrosIniciales = {
      carrera: "",
      materia: "",
      tema: "",
    };

    const [filtros, setFiltros] = useState(filtrosIniciales);

    const cambioDeFiltro = () => {};

    const buscarFiltros = (event) => {
        event.preventDefault();
    }


    return (
      <form onSubmit={buscarFiltros}>
        <fieldset>
          <label htmlFor="carrera">Carrera</label>
          <select
            id="carreras"
            required
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
            required
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
            required
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
              id="masVisualizadas"
              name="masVisualizadas"
              value="1"
            />
            Más visualizadas
          </label>

          <label>
            <input type="radio" id="utiles" name="utiles" value="2" />
            Útiles
          </label>
        </fieldset>

        <Boton texto="Buscar" tipo="boton principal w-50" />
      </form>
    );
}
