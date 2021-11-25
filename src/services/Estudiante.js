const REACT_APP_API_URL = process.env.REACT_APP_API_URL;
const REACT_APP_ESTUDIANTES_ENDPOINT = process.env.REACT_APP_ESTUDIANTES_ENDPOINT;

export async function servicioLogin(datosDeUsuario) {
    return fetch(`${REACT_APP_API_URL}${REACT_APP_ESTUDIANTES_ENDPOINT}/login`, {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            usuario: datosDeUsuario.usuario,
            contrasenia: datosDeUsuario.contrasenia
        })
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })    
}

export async function servicioBuscarEstudiante(nombreUsuario) {
    return fetch(`${REACT_APP_API_URL}${REACT_APP_ESTUDIANTES_ENDPOINT}/${nombreUsuario}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        return data;
    })    
}