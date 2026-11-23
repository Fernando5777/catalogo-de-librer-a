
const estudiantes = [
  { id: 1, nombre: 'Ana', nota: 4.5 },
  { id: 2, nombre: 'Luis', nota: 2.8 },
  { id: 3, nombre: 'Jorge', nota: 4.0 }
];

function obtenerEstudiantes() {
  return estudiantes;
}

function guardarEstudiante(estudiante) {
  estudiantes.push(estudiante);
  return estudiante;
}

module.exports = {
  obtenerEstudiantes,
  guardarEstudiante
};
