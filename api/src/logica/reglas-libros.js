
export const STOCK_BAJO = 3;
export const ANIO_MINIMO = 1000;
export const PRECIO_MINIMO = 1;

export const ESTADO_AGOTADO = 'agotado';
export const ESTADO_POCO_STOCK = 'poco stock';
export const ESTADO_DISPONIBLE = 'disponible';

export function estadoDeStock(stock) {
  if (stock <= 0) return ESTADO_AGOTADO;
  if (stock <= STOCK_BAJO) return ESTADO_POCO_STOCK;
  return ESTADO_DISPONIBLE;
}

export function calcularValorInventario(libros) {
  return libros.reduce((suma, libro) => suma + libro.precio * libro.stock, 0);
}

// Devuelve { valido: true } o { valido: false, error: 'mensaje claro' }
export function validarLibro({ titulo, autor, anio, precio, stock } = {}) {
  if (!titulo || String(titulo).trim() === '' || !autor || String(autor).trim() === '') {
    return { valido: false, error: 'Faltan titulo o autor' };
  }

  const anioActual = new Date().getFullYear();
  const anioNum = Number(anio);
  if (!Number.isInteger(anioNum) || anioNum < ANIO_MINIMO || anioNum > anioActual) {
    return { valido: false, error: `El anio debe estar entre ${ANIO_MINIMO} y ${anioActual}` };
  }

  const precioNum = Number(precio);
  if (Number.isNaN(precioNum) || precioNum < PRECIO_MINIMO) {
    return { valido: false, error: `El precio debe ser un numero mayor o igual a ${PRECIO_MINIMO}` };
  }

  const stockNum = Number(stock);
  if (!Number.isInteger(stockNum) || stockNum < 0) {
    return { valido: false, error: 'El stock debe ser un entero mayor o igual a 0' };
  }

  return { valido: true };
}
