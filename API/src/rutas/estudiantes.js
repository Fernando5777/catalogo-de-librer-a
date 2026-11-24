
const express = require('express');
const router = express.Router();

const {
  obtenerEstudiantes,
  guardarEstudiante
} = require('../datos/repositorio');

const {
  estaAprobado,
  validarEstudiante
} = require('../logica/reglas-notas');

// GET: obtener todos los estudiantes
router.get('/', (req, res) => {
  res.json(obtenerEstudiantes());
});

// GET: obtener estudiantes con su estado académico
router.get('/resumen', (req, res) => {
  const resumen = obtenerEstudiantes().map(estudiante => ({
    ...estudiante,
    aprobado: estaAprobado(estudiante.nota)
  }));

  res.json(resumen);
});

// POST: registrar un estudiante
router.post('/', (req, res) => {
  const error = validarEstudiante(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const nuevoEstudiante = {
    id: Date.now(),
    nombre: req.body.nombre.trim(),
    nota: req.body.nota
  };

  guardarEstudiante(nuevoEstudiante);

  res.status(201).json(nuevoEstudiante);
});

module.exports = router;
