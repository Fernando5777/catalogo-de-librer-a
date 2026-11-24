import { describe, expect, it } from 'vitest';
import {
  calcularValorInventario,
  estadoDeStock,
  ESTADO_AGOTADO,
  ESTADO_DISPONIBLE,
  ESTADO_POCO_STOCK,
  validarLibro,
} from './reglas-libros.js';

const anioActual = new Date().getFullYear();

const libroValido = {
  titulo: 'Libro',
  autor: 'Autor',
  anio: anioActual,
  precio: 10,
  stock: 1,
};

describe('estadoDeStock', () => {
  it.each([
    [0, ESTADO_AGOTADO],
    [-1, ESTADO_AGOTADO],
    [1, ESTADO_POCO_STOCK],
    [3, ESTADO_POCO_STOCK],
    [4, ESTADO_DISPONIBLE],
  ])('clasifica stock %i como %s', (stock, estado) => {
    expect(estadoDeStock(stock)).toBe(estado);
  });
});

describe('calcularValorInventario', () => {
  it('suma precio por stock de todos los libros', () => {
    expect(calcularValorInventario([
      { precio: 10, stock: 2 },
      { precio: 5, stock: 3 },
    ])).toBe(35);
  });

  it('devuelve cero para un inventario vacío', () => {
    expect(calcularValorInventario([])).toBe(0);
  });
});

describe('validarLibro', () => {
  it('acepta un libro válido', () => {
    expect(validarLibro(libroValido)).toEqual({ valido: true });
  });

  it.each([
    ['titulo', { titulo: '' }],
    ['titulo con espacios', { titulo: '   ' }],
    ['autor', { autor: '' }],
    ['autor con espacios', { autor: '   ' }],
  ])('rechaza %s vacío', (_caso, cambio) => {
    expect(validarLibro({ ...libroValido, ...cambio }).valido).toBe(false);
  });

  it.each([
    ['menor al mínimo', 999],
    ['posterior al año actual', anioActual + 1],
  ])('rechaza un año %s', (_caso, anio) => {
    expect(validarLibro({ ...libroValido, anio }).valido).toBe(false);
  });

  it.each([
    ['cero', 0],
    ['menor al mínimo', -1],
    ['texto', 'texto'],
    ['infinito', Infinity],
    ['menos infinito', -Infinity],
    ['NaN', NaN],
  ])('rechaza un precio %s', (_caso, precio) => {
    expect(validarLibro({ ...libroValido, precio }).valido).toBe(false);
  });

  it('acepta un precio normal igual o superior al mínimo', () => {
    expect(validarLibro({ ...libroValido, precio: 1 }).valido).toBe(true);
    expect(validarLibro({ ...libroValido, precio: 25 }).valido).toBe(true);
  });

  it.each([
    ['decimal', 1.5],
    ['negativo', -1],
  ])('rechaza stock %s', (_caso, stock) => {
    expect(validarLibro({ ...libroValido, stock }).valido).toBe(false);
  });

  it('acepta el año actual', () => {
    expect(validarLibro({ ...libroValido, anio: anioActual }).valido).toBe(true);
  });
});
