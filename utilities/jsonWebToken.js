import jwt from 'jsonwebtoken';

export function obtenerToken(estudiante) {
    return jwt.sign({usuario: estudiante}, 'secretKey', {expiresIn: "1h"});
}

export function VerificarToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
  
    if (typeof bearerHeader !== 'undefined') {
  
      jwt.verify(bearerHeader, 'secretKey', (error, authData) => {
        if (error) {
          res.status(403).send(
            {
              exitoso: false,
              mensaje: "El token recibido ha expirado o no existe.",
              data: null,
            }
          )
        }else{
          next();
        }
      })
  
    }else{
      res.status(403).send(
        {
          exitoso: false,
          mensaje: "Token no especificado.",
          data: null,
        }
      )
    }
  }