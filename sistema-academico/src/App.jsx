import { useState } from 'react';
import './App.css';

import Boton from './components/Boton';
import FilaEstudiante from './components/FilaEstudiante';

function App() {
  const [estudiantes, setEstudiantes] = useState([
    { id: 1, nombre: 'Ana', nota: 4.5 },
    { id: 2, nombre: 'Luis', nota: 2.8 },
    { id: 3, nombre: 'Jorge', nota: 4.0 }
  ]);

  const [nombre, setNombre] = useState('');
  const [nota, setNota] = useState('');

  function agregarEstudiante() {
    if (!nombre.trim() || nota === '') {
      alert('Completa el nombre y la nota.');
      return;
    }

    const notaNumerica = Number(nota);

    if (notaNumerica < 0 || notaNumerica > 5) {
      alert('La nota debe estar entre 0 y 5.');
      return;
    }

    const nuevoEstudiante = {
      id: crypto.randomUUID(),
      nombre: nombre.trim(),
      nota: notaNumerica
    };

    setEstudiantes([...estudiantes, nuevoEstudiante]);

    setNombre('');
    setNota('');
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