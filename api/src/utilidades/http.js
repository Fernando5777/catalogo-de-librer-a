// DRY en el back: una sola funcion para responder y un middleware escrito una vez.
export function responder(res, codigo, datos) {
  res.status(codigo).json(datos);
}

export function registrar(req, res, siguiente) {
  console.log(`${req.method} ${req.url}`);
  siguiente();
}
