// const ENDPOINT = 'http://localhost:4200/estudiantes';
const ENDPOINT = 'https://jsonplaceholder.typicode.com';

export async function servicioObtenerNotas() {
    return fetch(`${ENDPOINT}/posts`, {
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