import bcrypt from 'bcrypt';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

export function encriptar(texto) {
    return bcrypt.hashSync(texto, SALT_ROUNDS);
}

export async function comparar(textoEncriptado, textoAComparar) {
    return await bcrypt.compare(textoAComparar, textoEncriptado);
}