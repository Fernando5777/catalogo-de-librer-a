ADR-001:Diseño del almacenamiento del proyecto en Amazon S3

Fecha: 2026-10-20
Autor: fernando alonso remolina mandon
Estado: Aceptada

1. Contexto

El proyecto esun catálogo de librería que permite consultar información de libros mediante una página web. Para garantizar su funcionamiento y proteger la información, es necesario implementar una estrategia de almacenamiento, recuperación y control de costos en Amazon S3.
Antes de esta fase, el proyecto no contaba con una estrategia suficiente para recuperar archivos eliminados o modificados por error. Además, era necesario separar los archivos públicos del sitio de la información interna, como inventario, proveedores, documentos y respaldos.
Almacenar todos los archivos sin distinguir su tipo o nivel de acceso podría exponer información interna y dificultar la administración de permisos. Asimismo, las versiones antiguas pueden aumentar el espacio utilizado y los costos de almacenamiento.
Por estas razones, se requiere una estructura organizada que permita recuperar archivos, controlar el acceso a la información y administrar su conservación mediante reglas de ciclo de vida.

2. Decisión

Se utilizarán los dos buckets existentes del proyecto: uno destinado a los archivos públicos del sitio web y otro para la información interna.

Bucket público: contendrá los archivos necesarios para publicar el catálogo, como `index.html`, hojas de estilo CSS, archivos JavaScript y portadas de libros autorizadas.
Bucket privado: almacenará la información interna mediante los prefijos `inventario/`, `proveedores/`, `respaldos/`, `documentos/` y `pruebas/`.
El acceso al bucket privado se limitará al equipo autorizado. Los archivos de prueba utilizarán información ficticia y no contendrán datos personales reales.
Se habilitará el versionado en los buckets correspondientes para facilitar la recuperación de archivos modificados o eliminados accidentalmente. También se configurarán reglas de ciclo de vida para administrar las versiones y reducir los costos cuando sea apropiado.

Los plazos propuestos son:

30 días: transición de los objetos seleccionados a S3 Standard-IA.
90 días: transición de los objetos seleccionados a S3 Glacier, siempre que la clase esté disponible y sea adecuada para su uso.
180 días: eliminación de las versiones no vigentes, de acuerdo con la regla configurada.

Las reglas se aplicarán únicamente a los objetos que cumplan las condiciones de almacenamiento y acceso establecidas. Los archivos que el sitio necesite servir inmediatamente no se archivarán si esto puede retrasar su disponibilidad.
Antes de aplicar los cambios, se comprobarán las opciones disponibles en la consola de AWS y el funcionamiento del sitio después de configurar las reglas.

3. Alternativas consideradas

1. Usar un solo bucket para todos los archivos. Se descarta porque aumentaría el riesgo de exponer información interna y dificultaría la separación de permisos y políticas.

2. No habilitar el versionado. Se descarta porque una modificación o eliminación accidental podría obligar a reconstruir y volver a subir archivos.

3. Habilitar el versionado sin reglas de ciclo de vida. Se descarta porque las versiones antiguas podrían acumularse indefinidamente y aumentar los costos.

4. Mantener todos los objetos permanentemente en S3 Standard. Se descarta para los datos históricos que se consultan con poca frecuencia, ya que podrían utilizar clases de almacenamiento más económicas. Sin embargo, los archivos esenciales para el sitio deben permanecer en una clase adecuada para su disponibilidad.
5. Utilizar únicamente Netlify y no demostrar el almacenamiento en S3. Se descarta para esta práctica porque el laboratorio requiere demostrar el versionado, la recuperación y las reglas de ciclo de vida en Amazon S3. En un proyecto real, Netlify podría continuar siendo una alternativa válida para publicar el sitio.

4. Consecuencias

4.1. Consecuencias positivas

* Se podrán recuperar versiones anteriores de los archivos después de modificaciones o eliminaciones accidentales.
* Los archivos públicos estarán separados de la información interna.
* Los prefijos facilitarán la organización y la aplicación de reglas específicas.
* Las reglas de ciclo de vida ayudarán a controlar la acumulación de versiones y los costos.
* La estructura permitirá revisar y mejorar las políticas de almacenamiento conforme crezca el proyecto.

4.2. Costos y desventajas aceptados

El versionado puede aumentar el almacenamiento utilizado y generar costos adicionales.

Las reglas de ciclo de vida requieren mantenimiento para evitar transiciones inadecuadas.

Los objetos archivados en Glacier pueden necesitar un tiempo de recuperación antes de estar disponibles.

La separación de buckets exige mantener correctamente los permisos y la organización.

Las transiciones, solicitudes y recuperaciones pueden generar cargos adicionales según la clase de almacenamiento y el uso.

4.3. Estimación de costos

Para comparar los escenarios, se considera una estimación de referencia con 1 GB de almacenamiento durante 12 meses, en la región US East (N. Virginia).

Escenario A: todos los archivos en S3 Standard. Costo anual estimado: US$ 0,276.

Escenario B: almacenamiento distribuido entre clases más económicas mediante reglas de ciclo de vida. Costo anual estimado: US$ 0,08364.

Diferencia estimada: US$ 0,19236 de ahorro anual.

Estos valores son estimaciones de referencia para comparar escenarios; el costo real dependerá de la distribución y antigüedad de los objetos, las solicitudes, las recuperaciones y las condiciones de cada clase de almacenamiento.

4.4. Aspectos por revisar en el futuro

Comparar los costos reales con y sin reglas de ciclo de vida mediante AWS Pricing Calculator.

Revisar periódicamente el volumen de almacenamiento y la frecuencia de acceso a los archivos.

Verificar los permisos del bucket privado y mantener los datos de prueba ficticios.

Comprobar que las reglas no afecten la disponibilidad de la página web.

Ajustar los plazos de transición y eliminación cuando cambien las necesidades del proyecto.

5. Conclusión

Se adopta una estrategia de almacenamiento en Amazon S3 que prioriza la recuperación de archivos, la separación de información pública y privada y el control de costos. El versionado y las reglas de ciclo de vida permitirán administrar mejor los archivos del catálogo, siempre que se revisen los permisos y se protejan los objetos necesarios para el funcionamiento inmediato del sitio.