bienvenido a la librería

BUENAS PRÁCTICAS DE DESARROLLO DE SOFTWARE

Catálogo de la Librería Artesanías y Literatura — Puerto Colombia

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Integrantes

•Jorge Sanchez

•Fernando Remolina

•Luis Nieves

Situación problema

La Librería Artesanías y Literatura de Puerto Colombia carece de un sistema que permita catalogar sus libros de manera organizada y eficiente. Esta situación dificulta la consulta de los ejemplares disponibles y puede hacer que la librería resulte menos atractiva para los turistas y visitantes que están acostumbrados al uso de herramientas tecnológicas.

Propuesta

Hemos pensado en desarrollar un catálogo funcional para la librería utilizando herramientas de desarrollo y control de versiones, especialmente Git, con el fin de organizar el proyecto y facilitar el trabajo colaborativo.

Actividades principales

1.Crear el repositorio del proyecto.

2.Agregar a los demás integrantes como colaboradores del repositorio.

3.Crear un archivo README con el nombre del proyecto y los integrantes.

4.Escribir y compartir el enlace del repositorio en el documento de la clase.



Proyecto académico — Buenas prácticas de desarrollo de software

## Desarrollo local

### Requisitos

- Node.js 22.12 o posterior (se recomienda una versión LTS compatible) y npm.
- Git para obtener el repositorio.

### API del catálogo de libros

Desde la raíz del repositorio, instala las dependencias:

```bash
cd api
npm install
```

La configuración de ejemplo está en `api/.env.example`. Puedes copiarla a `api/.env` (en PowerShell: `Copy-Item .env.example .env` desde `api/`) y ajustar estas variables:

| Variable | Valor predeterminado | Uso |
|---|---|---|
| `PORT` | `3000` | Puerto de la API |
| `CORS_ORIGIN` | `http://localhost:5173` | Origen autorizado para solicitudes del navegador |

Inicia la API desde `api/`:

```bash
npm run dev
```

Para iniciar sin modo de recarga automática, usa `npm start`. La API queda en `http://localhost:3000`.

### Front-end

El front-end React está en `sistema-academico/`. En una terminal separada, desde la raíz:

```bash
cd sistema-academico
npm install
npm run dev
```

Vite muestra en la terminal la dirección local, normalmente `http://localhost:5173`. Esta interfaz es una demostración de notas de estudiantes y consulta `/api/estudiantes`; no es todavía una interfaz para el catálogo ni consume `/libros`.

### Endpoints de libros

| Método y ruta | Respuesta |
|---|---|
| `GET /salud` | `200` y estado de la API |
| `GET /libros` | `200` y arreglo de libros, cada uno con `estado` |
| `GET /libros/resumen` | `200` y campos `total`, `agotados`, `disponibles` y `valorInventario` |
| `POST /libros` | `201` y el libro creado; `400` si los datos no son válidos |

Ejemplo de cuerpo JSON para `POST http://localhost:3000/libros`:

```json
{
  "titulo": "La vorágine",
  "autor": "José Eustasio Rivera",
  "anio": 1924,
  "genero": "Novela",
  "precio": 45000,
  "stock": 5
}
```

En Postman o Thunder Client, configura el encabezado `Content-Type: application/json`.

### Pruebas

Desde `api/`, ejecuta las pruebas una vez:

```bash
npm test
```

Para ejecutarlas en modo interactivo:

```bash
npm run test:watch
```

Las pruebas cubren las reglas de stock e inventario, la validación de libros y los endpoints de la API.

### Limitaciones conocidas

- Los libros se almacenan en memoria; al reiniciar la API se pierden los libros agregados durante la ejecución.
- El front-end actual es una demostración de estudiantes, todavía no está conectado a la API del catálogo de libros.


## Despliegue en AWS

| Integrante | URL del sitio | Bucket público | Bucket privado |
|---|---|---|---|
| Luis Nieves | https://cuc-bq-eq6-nieves-sitio-2026.s3.us-east-1.amazonaws.com/index.html | cuc-bq-eq6-nieves-sitio-2026 | cuc-bq-eq6-nieves-privado-2026 |

El sitio se migró de Netlify a Amazon S3 para alojar sus archivos estáticos. El bucket público sirve el sitio y el bucket privado se reserva para archivos que no deben ser accesibles públicamente.


Despliegue en AWS

| Integrante | URL del sitio | Bucket público | Bucket privado |

| fernando alonso remolina mandon | http://cuc-bp-eq6-remolina-sitio-2026.s3-website-us-east-1.amazonaws.com/ | cuc-bp-eq6-remolina-sitio-2026 | cuc-bp-eq6-remolina-privado-2026  |

El sitio se migró de Netlify a Amazon S3 para poder alojar sus archivos estáticos. El bucket público sirve el sitio y el bucket privado se reserva para archivos que no deben ser accesibles públicamente.


| Integrante | URL del sitio | Bucket publico | Bucket privado |
|---|---|---|---|
| Jorge Andrés Sánchez | http://cuc-bp.eq06-sanchez-sitio-2026.s3-website-us-east-1.amazonaws.com | cuc-bp.eq06-sanchez-sitio-2026 | cuc-bp.eq06-sanchez-privado-2026 |
