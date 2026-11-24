
import { Router } from 'express';
import { listar, agregar } from '../datos/repositorio.js';
import { estadoDeStock, calcularValorInventario, validarLibro, ESTADO_AGOTADO } from '../logica/reglas-libros.js';
import { responder } from '../utilidades/http.js';

const router = Router();


const conEstado = (libro) => ({ ...libro, estado: estadoDeStock(libro.stock) });

router.get('/', (req, res) => {
  responder(res, 200, listar().map(conEstado));
});

router.get('/resumen', (req, res) => {
  const lista = listar().map(conEstado);
  responder(res, 200, {
    total: lista.length,
    agotados: lista.filter((l) => l.estado === ESTADO_AGOTADO).length,
    disponibles: lista.filter((l) => l.estado !== ESTADO_AGOTADO).length,
    valorInventario: calcularValorInventario(lista),
  });
});

router.post('/', (req, res) => {
  const resultado = validarLibro(req.body);
  if (!resultado.valido) {
    return responder(res, 400, { error: resultado.error });
  }
  responder(res, 201, conEstado(agregar(req.body)));
});

export default router;
