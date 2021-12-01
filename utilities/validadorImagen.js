function tieneExtensionCorrecta(mimetype) {
    const extensionesEsperadas = ['png', 'jpg', 'jpeg'];

    const extensionActual = mimetype.split('/').pop();

    return extensionesEsperadas.includes(extensionActual);
}

function superaTamañoPermitido(size) {
    const UN_MEGA_BYTE = 1024;
    const DOS_MEGA_BYTES = UN_MEGA_BYTE * 2;

    const tamañoActual = Math.round(size / UN_MEGA_BYTE);

    var superaTamaño = false;

    if (tamañoActual > DOS_MEGA_BYTES) {
      superaTamaño = true;
    }

    return superaTamaño;
}

export function validarImagen(req, res, next) {
  if (req.files && req.files.imagen) {
    const { imagen } = req.files;

    var resultado = {
      exitoso: false,
      mensaje: "",
      data: {},
    };

    if (!tieneExtensionCorrecta(imagen.mimetype)) {
      resultado.mensaje =
        "La imagen tiene una extensión incorrecta. Por favor seleccione una imagen con extensión png, jpg o jpeg.";
      return res.status(400).send(resultado);
    }

    if (superaTamañoPermitido(imagen.size)) {
      resultado.mensaje =
        "El tamaño máximo de una imagen debe ser de 2MG. Por favor seleccione una imagen con un tamaño igual o menor al permitido.";
      return res.status(400).send(resultado);
    }
  }

  next();
}