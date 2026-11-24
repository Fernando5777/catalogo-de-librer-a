import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import libros from './rutas/libros.js';
import { registrar, responder } from './utilidades/http.js';

const app = express();

// CORS restringido: SOLO el front. En produccion CORS_ORIGIN es la URL del bucket S3
// (por ejemplo http://cuc-bp-eq6-remolina-sitio-2026.s3-website-us-east-1.amazonaws.com).
const ORIGEN_PERMITIDO = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(cors({ origin: ORIGEN_PERMITIDO }));
app.use(express.json());
app.use(registrar);

app.get('/salud', (req, res) => responder(res, 200, { estado: 'ok' }));
app.use('/libros', libros);

app.use((req, res) => responder(res, 404, { error: 'Ruta no encontrada' }));

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => console.log('API escuchando en el puerto ' + PUERTO));
