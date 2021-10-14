import { createTransport } from 'nodemailer'

const USER = process.env.EMAIL_USER
const PASSWORD = process.env.EMAIL_PASSWORD

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: USER,
    pass: PASSWORD
  },
});

const EMAIL_FROM = '"Note It" <verificacion@noteit.com>'


export default async function enviarCorreoCodigoVerificacion(email, usuario, codigoVerificacion) {
  const correo = {
    from: EMAIL_FROM,
    to: email,
    subject: "Verificación de correo electrónico",
    html: `<h1>¡Hola ${usuario}!<h1/><p>¡Ya casi perteneces a nuestra comunidad!</p>
    <p>Tu código de verificación es <strong>${codigoVerificacion}</strong>.</p>`,
  };

  await transporter.sendMail(correo)
  .then(respuesta => console.log(respuesta))
  .catch(error => console.error(error))
}