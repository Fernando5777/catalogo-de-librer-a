import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { once } from 'node:events';
import app from '../app.js';

const libroValido = {
  titulo: 'La vorágine',
  autor: 'José Eustasio Rivera',
  anio: 1924,
  genero: 'Novela',
  precio: 45000,
  stock: 5,
};

let server;
let baseUrl;

beforeAll(async () => {
  server = app.listen(0);
  await once(server, 'listening');
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

afterAll(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

describe('endpoints de libros', () => {
  it('GET /libros devuelve libros con estado', async () => {
    const response = await fetch(`${baseUrl}/libros`);
    const libros = await response.json();

    expect(response.status).toBe(200);
    expect(Array.isArray(libros)).toBe(true);
    expect(libros.length).toBeGreaterThan(0);
    expect(libros.every((libro) => typeof libro.estado === 'string')).toBe(true);
  });

  it('GET /libros/resumen devuelve los totales del inventario', async () => {
    const response = await fetch(`${baseUrl}/libros/resumen`);
    const resumen = await response.json();

    expect(response.status).toBe(200);
    expect(resumen).toEqual(expect.objectContaining({
      total: expect.any(Number),
      agotados: expect.any(Number),
      disponibles: expect.any(Number),
      valorInventario: expect.any(Number),
    }));
  });

  it('POST /libros crea un libro válido y responde 201', async () => {
    const response = await fetch(`${baseUrl}/libros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(libroValido),
    });
    const creado = await response.json();

    expect(response.status).toBe(201);
    expect(creado).toEqual(expect.objectContaining({
      titulo: libroValido.titulo,
      autor: libroValido.autor,
      anio: libroValido.anio,
      precio: libroValido.precio,
      stock: libroValido.stock,
      estado: 'disponible',
    }));
  });

  it('POST /libros rechaza un libro inválido con 400', async () => {
    const response = await fetch(`${baseUrl}/libros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...libroValido, stock: -1 }),
    });
    const error = await response.json();

    expect(response.status).toBe(400);
    expect(error.error).toBeTruthy();
  });
});
