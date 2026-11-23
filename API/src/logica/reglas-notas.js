
const NOTA_MINIMA = 3.0;

function calcularPromedio(notas) {
  if (!Array.isArray(notas) || notas.length === 0) {
    throw new Error('Se necesita una lista de notas.');
  }

  const suma = notas.reduce((total, nota) => total + nota, 0);

  return suma / notas.length;
}

function estaAprobado(nota) {
  return nota >= NOTA_MINIMA;
}

function validarEstudiante(estudiante) {
  if (!estudiante || typeof estudiante.nombre !== 'string' || !estudiante.nombre.trim()) {
    return 'El nombre del estudiante es obligatorio.';
  }

  if (
    typeof estudiante.nota !== 'number' ||
    !Number.isFinite(estudiante.nota) ||
    estudiante.nota < 0 ||
    estudiante.nota > 5
  ) {
    return 'La nota debe ser un número entre 0 y 5.';
  }

  return null;
}

module.exports = {
  NOTA_MINIMA,
  calcularPromedio,
  estaAprobado,
  validarEstudiante
};
