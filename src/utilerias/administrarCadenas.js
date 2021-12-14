export function obtenerCadenaSinEspacios(cadena) {
  return cadena.replace(/ +(?= )/g, "");
}