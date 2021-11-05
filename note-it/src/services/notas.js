const ENDPOINT = 'http://localhost:4200';

export async function servicioObtenerNotas() {
    return fetch(`${ENDPOINT}/api/notas`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        return data.data;
    })    
}

export async function servicioObtenerNota(idNota) {
    return fetch(`${ENDPOINT}/api/notas?id=${idNota}`, {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        return data.data;
    })    
}

export async function crearNuevaNota(nota) {
    var form = new FormData();

    form.append("titulo", nota.titulo);
    form.append("cuerpo", nota.cuerpo.value);
    form.append("carrera", nota.carrera);
    form.append("materia", nota.materia);
    form.append("tema", nota.tema);
    form.append("autor", "6178db2ca64a62f62989cf93");

    if (nota.imagen && nota.imagen.files.length > 0) {
        form.append("imagen", nota.imagen.files[0], nota.imagen.value);
    }

    return fetch(`http://localhost:4200/api/notas`, {
        method: "POST",
        body: form,
        headers:{
            'authorization': sessionStorage.getItem('token')
        }
    })
    .then(response => {
        return response.json();
    })
    .then(resultado => {
        console.log(resultado);
        return resultado;
    })
    .catch(err => {
        console.error(err);

        return {
            exitoso: false,
            mensaje: "Ocurrió un error al intentar conectarse al servidor. Intente más tarde.",
            data: err
        }
    })
}