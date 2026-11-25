
import { useEffect, useState } from 'react'
import BookCard from './BookCard'
import './App.css'

const API_URL = 'http://localhost:3000'

function App() {
  const [libros, setLibros] = useState([])
  const [resumen, setResumen] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
const [mensaje, setMensaje] = useState('')
const [tipoMensaje, setTipoMensaje] = useState('')
  useEffect(() => {
    async function cargarCatalogo() {
      try {
        const [respuestaLibros, respuestaResumen] = await Promise.all([
          fetch(`${API_URL}/libros`),
          fetch(`${API_URL}/libros/resumen`)
        ])

        if (!respuestaLibros.ok || !respuestaResumen.ok) {
          throw new Error('No fue posible consultar el catálogo')
        }

        const datosLibros = await respuestaLibros.json()
        const datosResumen = await respuestaResumen.json()

        setLibros(datosLibros)
        setResumen(datosResumen)
      } catch (err) {
        setError(err.message)
      } finally {
        setCargando(false)
      }
    }

    cargarCatalogo()
  }, [])

  const librosFiltrados = libros.filter((libro) =>
    `${libro.titulo} ${libro.autor}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  )

  const formatoPrecio = (valor) =>
    new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(valor)

  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <span className="brand-icon">📚</span>
          <div>
            <h1>Artesanías y Literatura</h1>
            <p>Puerto Colombia</p>
          </div>
        </div>

        <nav>
          <a href="#inicio">Inicio</a>
          <a href="#catalogo">Catálogo</a>
          <a href="#inventario">Inventario</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div>
            <span className="eyebrow">
              UN ESPACIO PARA LOS AMANTES DE LA LECTURA
            </span>
            <h2>Descubre historias que merecen ser contadas.</h2>
            <p>
              Explora nuestro catálogo de libros y encuentra tu próxima
              lectura favorita en Puerto Colombia.
            </p>
            <a href="#catalogo" className="primary-button">
              Explorar catálogo
            </a>
          </div>
          <div className="hero-decoration">📖</div>
        </section>

        <section className="inventory" id="inventario">
          <article className="stat-card">
            <span>Total de libros</span>
            <strong>{resumen?.total ?? '--'}</strong>
          </article>

          <article className="stat-card">
            <span>Disponibles</span>
            <strong>{resumen?.disponibles ?? '--'}</strong>
          </article>

          <article className="stat-card">
            <span>Agotados</span>
            <strong>{resumen?.agotados ?? '--'}</strong>
          </article>

          <article className="stat-card">
            <span>Valor del inventario</span>
            <strong>
              {resumen
                ? formatoPrecio(resumen.valorInventario)
                : '--'}
            </strong>
          </article>
        </section>

        <section className="catalog" id="catalogo">
          <div className="section-heading">
            <div>
              <span className="eyebrow">NUESTRA COLECCIÓN</span>
              <h2>Explora nuestros libros</h2>
            </div>
          </div>

          <div className="search-box">
            <input
              type="search"
              placeholder="Buscar por título o autor..."
              aria-label="Buscar libros"
              value={busqueda}
              onChange={(event) => setBusqueda(event.target.value)}
            />
          </div>

          {cargando && <p>Cargando catálogo...</p>}

          {error && <p role="alert">{error}</p>}

          {!cargando && !error && (
            <div className="book-grid">
              {librosFiltrados.map((libro) => (
              <BookCard
  key={libro.id}
  libro={libro}
  formatoPrecio={formatoPrecio}
/>
              ))}

              {librosFiltrados.length === 0 && (
                <p>No encontramos libros con esa búsqueda.</p>
              )}
            </div>
          )}
        </section>
        <section className="form-section" id="agregar-libro">
          <div className="section-heading">
            <span className="eyebrow">AMPLÍA NUESTRA COLECCIÓN</span>
            <h2>Agregar un libro</h2>
            <p>Registra un nuevo ejemplar en nuestro catálogo.</p>
          </div>

          <form
            className="book-form"
            onSubmit={async (event) => {
              event.preventDefault()

              const formulario = event.currentTarget
              const datos = Object.fromEntries(new FormData(formulario))

              const libro = {
                ...datos,
                anio: Number(datos.anio),
                precio: Number(datos.precio),
                stock: Number(datos.stock)
              }

              try {
                const respuesta = await fetch(`${API_URL}/libros`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(libro)
                })

                const resultado = await respuesta.json()

                if (!respuesta.ok) {
                  throw new Error(resultado.error || 'No se pudo registrar el libro')
                }

                const [respuestaLibros, respuestaResumen] = await Promise.all([
                  fetch(`${API_URL}/libros`),
                  fetch(`${API_URL}/libros/resumen`)
                ])

                if (!respuestaLibros.ok || !respuestaResumen.ok) {
                  throw new Error('El libro se registró, pero no se pudo actualizar el catálogo')
                }

                setLibros(await respuestaLibros.json())
                setResumen(await respuestaResumen.json())
                formulario.reset()
                setTipoMensaje('exito')
setMensaje('¡Libro registrado correctamente!')
              } catch (error) {
                setTipoMensaje('error')
setMensaje(error.message)
              }
            }}
          >
            <label>
              Título
              <input name="titulo" required />
            </label>

            <label>
              Autor
              <input name="autor" required />
            </label>

            <label>
              Año de publicación
              <input name="anio" type="number" min="1" required />
            </label>

            <label>
              Género
              <input name="genero" required />
            </label>

            <label>
              Precio (COP)
              <input name="precio" type="number" min="0" required />
            </label>

            <label>
              Existencias
              <input name="stock" type="number" min="0" required />
            </label>

            <button type="submit" className="primary-button">
              Registrar libro
            </button>
          {mensaje && (
  <p className={`form-message ${tipoMensaje}`}>
    {mensaje}
  </p>
)}
          </form>
        </section>      
</main>

      <footer>
        <p>Artesanías y Literatura · Puerto Colombia</p>
        <span>Un libro, una nueva historia.</span>
      </footer>
    </div>
  )
}

export default App
