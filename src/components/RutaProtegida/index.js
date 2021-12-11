import React, { useContext } from 'react';
import { Route, Redirect } from "react-router-dom";
import contextoEstudiante from '../../context/UserContext';

export default function RutaProtegida({ component: Component, ...rest}) {
    const {datosEstudiante} = useContext(contextoEstudiante);

    return (
        <Route { ...rest } render={
            props => {
                if (datosEstudiante) {
                    return <Component {...rest} {...props} />;
                }
                else {
                    return <Redirect to={{pathname: '/'}}/>
                }
            }
        }/>
    )
}
