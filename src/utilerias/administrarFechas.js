export function formatearFecha(fecha) {
    if (!fecha) return;

    const fechaFormateada = new Date(fecha);

    return fechaFormateada.toLocaleString();
}