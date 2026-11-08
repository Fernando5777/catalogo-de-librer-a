const http = require('http');

const NOTA_MINIMA = 3.0;
const notasDelCurso = [4.5, 3.5, 2.5, 4.0];

function calcularPromedio(notas) {
  return notas.reduce((suma, nota) => suma + nota, 0) / notas.length;
}

function estaAprobado(promedio) {
  return promedio >= NOTA_MINIMA;
}

function obtenerResumenNotas() {
  const promedio = calcularPromedio(notasDelCurso);
  return {
    promedio: promedio,
    aprobado: estaAprobado(promedio)
  };
}

function responder(res, codigo, datos) {
  res.writeHead(codigo, {
    'Content-Type': 'application/json; charset=utf-8'
  });
  res.end(JSON.stringify(datos, null, 2));
}

const rutas = {
  '/salud': () => ({ estado: 'ok' }),

  '/equipo': () => ({
    equipo: 'Equipo 06',
    integrantes: ['Luis', 'Jorge']
  }),

  '/notas': obtenerResumenNotas
};

const servidor = http.createServer((req, res) => {
  const obtenerDatos = rutas[req.url];

  if (obtenerDatos) {
    responder(res, 200, obtenerDatos());
  } else {
    responder(res, 404, {
      error: 'Ruta no encontrada'
    });
  }
});

servidor.listen(3000);