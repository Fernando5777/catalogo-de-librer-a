
import { describe, it, expect } from 'vitest';
import reglas from '../logica/reglas-notas.js';

const {
  calcularPromedio,
  estaAprobado,
  validarEstudiante
} = reglas;

describe('Pruebas de reglas académicas', () => {

  it('Calcula correctamente el promedio', () => {
    expect(calcularPromedio([4, 3, 5])).toBe(4);
  });

  it('Rechaza una lista de notas vacía', () => {
    expect(() => calcularPromedio([])).toThrow();
  });

  it('Determina si un estudiante aprueba', () => {
    expect(estaAprobado(4)).toBe(true);
  });

  it('Rechaza notas inferiores al mínimo', () => {
    expect(estaAprobado(2.5)).toBe(false);
  });

  it('Valida una nota fuera del rango', () => {
    expect(validarEstudiante({
      nombre: 'Carlos',
      nota: 8
    })).toBe('La nota debe ser un número entre 0 y 5.');
  });

});
