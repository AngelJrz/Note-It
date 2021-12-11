import React, { useState } from "react";

const contextoEstudiante = React.createContext(null);
const REACT_APP_SESSION_KEY = process.env.REACT_APP_SESSION_KEY;

export function EstudianteContextProvider({children}) {
    const [datosEstudiante, setDatosEstudiante] = useState(JSON.parse(window.sessionStorage.getItem(REACT_APP_SESSION_KEY)));

    return <contextoEstudiante.Provider value={{datosEstudiante, setDatosEstudiante}}>
        {children}
    </contextoEstudiante.Provider>
}

export default contextoEstudiante;