
const express = require('express');
const cors = require('cors');

const estudiantesRoutes = require('./rutas/estudiantes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta principal de estudiantes
app.use('/api/estudiantes', estudiantesRoutes);

// Ruta de comprobación del servidor
app.get('/api/salud', (req, res) => {
  res.json({ estado: 'ok', mensaje: 'API funcionando correctamente' });
});

// Manejo de rutas inexistentes
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada'
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: 'Error interno del servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

module.exports = app;
