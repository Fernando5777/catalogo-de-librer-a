import { estaAprobado } from '../utils/estaAprobado';

function FilaEstudiante({ estudiante }) {
  return (
    <tr>
      <td>{estudiante.nombre}</td>
      <td>{estudiante.nota.toFixed(1)}</td>
      <td>
        {estaAprobado(estudiante.nota)
          ? 'Aprobado'
          : 'Reprobado'}
      </td>
    </tr>
  );
}

export default FilaEstudiante;