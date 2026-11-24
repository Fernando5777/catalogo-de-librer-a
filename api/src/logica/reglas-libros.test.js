import { describe, expect, it } from 'vitest';
import { validarLibro } from './reglas-libros.js';

const anioActual = new Date().getFullYear();

const libroValido = {
  titulo: 'Libro',
  autor: 'Autor',
  anio: anioActual,
  precio: 10,
  stock: 1,
};

describe('validarLibro', () => {
  it.each([
    ['cero', 0],
    ['texto', 'texto'],
    ['negativo', -1],
    ['infinito', Infinity],
  ])('rechaza un precio %s', (_caso, precio) => {
    expect(validarLibro({ ...libroValido, precio }).valido).toBe(false);
  });

  it('acepta un precio numérico normal', () => {
    expect(validarLibro({ ...libroValido, precio: 25 }).valido).toBe(true);
  });

  it.each([
    ['decimal', 1.5],
    ['negativo', -1],
  ])('rechaza stock %s', (_caso, stock) => {
    expect(validarLibro({ ...libroValido, stock }).valido).toBe(false);
  });

  it('acepta el año actual y rechaza uno futuro', () => {
    expect(validarLibro({ ...libroValido, anio: anioActual }).valido).toBe(true);
    expect(validarLibro({ ...libroValido, anio: anioActual + 1 }).valido).toBe(false);
  });
});
