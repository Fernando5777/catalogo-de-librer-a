
import { useState, useEffect } from 'react';
import './App.css';

import Boton from './components/Boton';
import FilaEstudiante from './components/FilaEstudiante';

const API_URL = 'http://localhost:3000/api/estudiantes';

function App() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');
  const [error, setError] = useState('');

  // Obtener estudiantes desde la API
  useEffect(() => {
    async function cargarEstudiantes() {
      try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
          throw new Error('No se pudieron cargar los estudiantes.');
        }

        const datos = await respuesta.json();
        setEstudiantes(datos);
      } catch (error) {
        setError(error.message);
      }
    }

    cargarEstudiantes();
  }, []);

  // Registrar un estudiante mediante POST
  async function agregarEstudiante() {
    if (!nombre.trim() || nota === '') {
      setError('Completa el nombre y la nota.');
      return;
    }

    const notaNumerica = Number(nota);

    if (!Number.isFinite(notaNumerica) || notaNumerica < 0 || notaNumerica > 5) {
      setError('La nota debe estar entre 0 y 5.');
      return;
    }

    try {
      const respuesta = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          nota: notaNumerica
        })
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error || 'No se pudo registrar el estudiante.');
      }

      setEstudiantes([...estudiantes, datos]);
      setNombre('');
      setNota('');
      setError('');

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="contenedor">
      <h1>Notas de estudiantes</h1>

      <div className="formulario">
        <input
          type="text"
          placeholder="Nombre del estudiante"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <input
          type="number"
          placeholder="Nota (0 a 5)"
          min="0"
          max="5"
          step="0.1"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
        />

        <Boton alHacerClic={agregarEstudiante}>
          Agregar estudiante
        </Boton>
      </div>

      {error && <p className="error">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Nota</th>
            <th>Estado</th>
          </tr>
        </thead>

        <tbody>
          {estudiantes.map((estudiante) => (
            <FilaEstudiante
              key={estudiante.id}
              estudiante={estudiante}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
