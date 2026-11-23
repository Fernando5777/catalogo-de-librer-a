// De donde salen y donde se guardan los datos (en memoria para el proyecto).
let libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, genero: 'Realismo mágico', precio: 59000, stock: 8 },
  { id: 2, titulo: 'El coronel no tiene quien le escriba', autor: 'Gabriel García Márquez', anio: 1961, genero: 'Novela corta', precio: 32000, stock: 3 },
  { id: 3, titulo: 'Crónica de una muerte anunciada', autor: 'Gabriel García Márquez', anio: 1981, genero: 'Novela policial / Ficción', precio: 38000, stock: 0 },
  { id: 4, titulo: 'El amor en los tiempos del cólera', autor: 'Gabriel García Márquez', anio: 1985, genero: 'Novela romántica', precio: 54000, stock: 12 },
];

export function listar() {
  return [...libros];
}

export function agregar({ titulo, autor, anio, genero, precio, stock }) {
  const nuevo = {
    id: Date.now(),
    titulo: String(titulo).trim(),
    autor: String(autor).trim(),
    anio: Number(anio),
    genero: genero ? String(genero).trim() : 'Sin género',
    precio: Number(precio),
    stock: Number(stock),
  };
  libros.push(nuevo);
  return nuevo;
}
