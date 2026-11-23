const books = [
  {
    titulo: "Cien años de soledad",
    author: "Gabriel García Márquez",
    categoria: "novela",
    año: 1967,
    precio: 45.0,
  },
  {
    titulo: "El principito",
    author: "Antoine de Saint-Exupéry",
    categoria: "ficción",
    año: 1943,
    precio: 30.0,
  },
  {
    titulo: "Don Quijote de la Mancha",
    author: "Miguel de Cervantes",
    categoria: "clásico",
    año: 1605,
    precio: 50.0,
  },
  {
    titulo: "Harry Potter y la piedra filosofal",
    author: "J.K. Rowling",
    categoria: "fantasía",
    año: 1997,
    precio: 55.0,
  },
  {
    titulo: "El hobbit",
    author: "J.R.R. Tolkien",
    categoria: "fantasía",
    año: 1937,
    precio: 48.0,
  },
  {
    titulo: "1984",
    author: "George Orwell",
    categoria: "ciencia ficción",
    año: 1948,
    precio: 40.0,
  },
];

const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search-input");

function displayBooks(booksCollection) {
  if (!bookList) return;

  bookList.innerHTML = "";

  booksCollection.forEach((book) => {
    const bookCard = document.createElement("article");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
      <h3>${book.titulo}</h3>
      <p><strong>Autor:</strong> ${book.author}</p>
      <p><strong>Categoría:</strong> ${book.categoria}</p>
      <p><strong>Año:</strong> ${book.año}</p>
      <p class="price"><strong>Precio:</strong> $${Number(book.precio).toLocaleString("es-ES")}</p>
      <button type="button">Ver detalles</button>
    `;

    bookList.appendChild(bookCard);
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.trim().toLowerCase();

    const filteredBooks = books.filter((book) =>
      book.titulo.toLowerCase().includes(searchText) ||
      book.author.toLowerCase().includes(searchText) ||
      book.categoria.toLowerCase().includes(searchText)
    );

    displayBooks(filteredBooks);
  });
}

displayBooks(books);