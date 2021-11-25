import React, { useState } from "react";

const contextoEstudiante = React.createContext(null);

export function EstudianteContextProvider({children}) {
    const [datosEstudiante, setDatosEstudiante] = useState(null);

    return <contextoEstudiante.Provider value={{datosEstudiante, setDatosEstudiante}}>
        {children}
    </contextoEstudiante.Provider>
}

export default contextoEstudiante;