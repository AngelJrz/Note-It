function cadenaAColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function generarLetrasAvatar(name) {
  var letras;
  if (name.includes(" ")) {
    letras = `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  } else {
    letras =
      name.substring(0, 2).charAt(0) +
      name.substring(0, 2).charAt(1);
  }
  return {
    sx: {
      bgcolor: cadenaAColor(name),
    },
    children: letras.toUpperCase(),
  };
}
