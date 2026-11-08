

const http = require('http');

// SEÑAL 4: CONSTANTE CON UN VALOR DESCRIPTIVO
const NOTA_MINIMA = 3.0;

// CAPA DE DATOS - SEÑAL 2
const notasDelCurso = [4.5, 3.5, 2.5, 4.0];

// CAPA DE LÓGICA - SEÑALES 2 Y 3
function calcularPromedio(notas) {
    const suma = notas.reduce((total, nota) => total + nota, 0);
    return suma / notas.length;
}

function estaAprobado(promedio) {
    return promedio >= NOTA_MINIMA;
}

function obtenerResumenNotas() {
    const promedio = calcularPromedio(notasDelCurso);

    return {
        promedio: promedio,
        aprobado: estaAprobado(promedio)
    };
}

// CAPA DE PRESENTACIÓN - SEÑAL 1
function responder(res, codigo, datos) {
    res.writeHead(codigo, {
        'Content-Type': 'application/json; charset=utf-8'
    });

    res.end(JSON.stringify(datos, null, 2));
}

// SEÑAL 3: RUTAS SEPARADAS POR RESPONSABILIDAD
const rutas = {
    '/salud': () => ({ estado: 'ok' }),

    '/equipo': () => ({
        equipo: 'Equipo 06',
        integrantes: [
            'Jorge Andres Sanchez Cuadrado',
            'Fernando Remolina',
            'Luis Nieves'
        ]
    }),

    '/notas': obtenerResumenNotas
};

// SERVIDOR HTTP
const servidor = http.createServer((req, res) => {
    const obtenerDatos = rutas[req.url];

    if (obtenerDatos) {
        responder(res, 200, obtenerDatos());
    } else {
        responder(res, 404, {
            error: 'Ruta no encontrada'
        });
    }
});

servidor.listen(80, () => {
    console.log('Servidor iniciado en el puerto 80');
});
