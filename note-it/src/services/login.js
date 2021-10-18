const ENDPOINT = 'http://localhost:4200/estudiantes';

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