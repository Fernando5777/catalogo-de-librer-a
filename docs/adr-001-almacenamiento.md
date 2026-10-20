<!--# ADR-001: Diseño del almacenamiento del proyecto en Amazon S3
 
Fecha: 2026-10-20
Autor: Luis Fernando Nieves Campuzano (Equipo 06)
Estado: Aceptada
 
## Contexto
El proyecto web de catálogo de librería necesita una infraestructura de almacenamiento persistente, segura y durable en Amazon S3. Anteriormente, los archivos estáticos del sitio se subían sin ningún mecanismo de protección, lo que significaba que un borrado accidental provocaba la caída total de la página (error 404) sin forma de recuperación nativa. Asimismo, el sistema maneja información comercial y personal sensible (como inventarios internos y datos de proveedores) que no puede ser expuesta públicamente, requiriendo un diseño estructurado de seguridad, control de versiones y optimización de costos a largo plazo.
 
## Decision
Se adoptó la siguiente arquitectura de almacenamiento en Amazon S3:
- **Buckets:** Se utilizaron dos buckets diferenciados: uno público para la web (`cuc-bp.eq06-sanchez-sitio-2026`) y uno privado para los datos internos (`cuc-bp.eq06-sanchez-privado-2026`).
- **Versionado:** Se habilitó el versionado de S3 para proteger los archivos frente a eliminaciones accidentales mediante el uso de delete markers.
- **Estructura de Prefijos:** El bucket privado se organizó mediante prefijos lógicos (`Archivos de la página/`, `Datos del inventario/`, `Datos y contactos de los proveedores/`, `Portadas de libros/` y `Respaldos/`) para optimizar el rendimiento de búsqueda y facilitar políticas de acceso segmentadas.
- **Ciclo de vida:** Se implementó una regla automática de ciclo de vida (`retencion-sitio`) con transiciones programadas: 30 días para Standard-IA, 90 días para Glacier Flexible Retrieval, y 60 días para la purga de versiones no vigentes.
 
## Alternativas consideradas
1. **Alojar el sitio estático en Netlify o Vercel en lugar de S3:** Se descartó porque el objetivo pedagógico y técnico del curso es dominar la infraestructura nativa de AWS S3, configurando manualmente políticas de acceso público, versionado y control de objetos.
2. **Utilizar un único bucket compartido para todo el proyecto:** Se descartó porque expondría los datos confidenciales de inventarios y proveedores al público general, o bien impediría que los visitantes del sitio web pudieran descargar los recursos gráficos y de estilos (`.html`, `.css`, `.js`) sin autenticación previa.
3. **No utilizar reglas de ciclo de vida ni control de versiones no vigentes:** Se descartó porque la acumulación indefinida de versiones anteriores incrementaría los costos de almacenamiento de manera innecesaria mes a mes.
 
## Consecuencias
### Positivas
- Recuperación inmediata ante fallos humanos o borrados accidentales sin necesidad de resubir los archivos.
- Reducción de costos de almacenamiento estimada en un 71% anual gracias al uso automatizado de clases de almacenamiento económico (Standard-IA y Glacier).
- Clara separación de responsabilidades y seguridad entre los recursos públicos del sitio y la información confidencial de la librería.
 
### Costos o desventajas que aceptamos
- Se asume una pequeña latencia (de minutos a horas) en la recuperación de datos históricos o archivados en caso de requerir consultar información muy antigua almacenada en Glacier Flexible Retrieval.
 
### Que habria que revisar mas adelante
- Evaluar si el plazo de 30 días para pasar a Standard-IA se ajusta de manera óptima al ciclo real de actualización del catálogo de la librería.
- Considerar la implementación de cifrado avanzado con llaves gestionadas en KMS para los prefijos que contienen datos altamente sensibles de proveedores.
 
  Seccion carrito de compras -->
