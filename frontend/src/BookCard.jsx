
function BookCard({ libro, formatoPrecio }) {
  return (
    <article className="book-card">
      <div className="book-cover">📖</div>

      <div className="book-info">
        <span className={`book-status ${libro.estado}`}>
          {libro.estado}
        </span>

        <h3>{libro.titulo}</h3>
        <p>{libro.autor}</p>
        <p>{libro.genero}</p>

        <div className="book-details">
          <span>{libro.anio}</span>
          <strong>{formatoPrecio(libro.precio)}</strong>
        </div>

        <p>Existencias: {libro.stock}</p>
      </div>
    </article>
  )
}

export default BookCard
