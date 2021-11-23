const ENDPOINT = 'http://localhost:4200/api/estudiantes';

export async function servicioLogin(datosDeUsuario) {
    return fetch(`${ENDPOINT}/login`, {
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
    return fetch(`${ENDPOINT}/${nombreUsuario}`, {
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