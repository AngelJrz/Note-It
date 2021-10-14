import { Guid } from "js-guid";

import Nota from '../models/Nota.js';

export async function crearNuevaNota(nuevaNota) {
    const id = Guid.newGuid();
    nuevaNota.id = id;

    const nota = new Nota(nuevaNota);

    return nota.save()
    .then((notaGuardada) => {
        console.log(notaGuardada);
        if(!notaGuardada)
            return false;

        return true;
    })
    .catch(error => {
        console.error(error);
        return false;
    })
}