const getBookHtml = (book) => {
  return `
    <div class="table">
      <div>${book.id}</div>
      <div onclick="showbookData(${book.id})" style="cursor: pointer; color: blue; text-decoration: underline;">${book.title}</div>
      <div>${book.price}</div>
      <div>action</div>
    </div>`;
};

const renderBooks = (books, index) => {
  const arr = books.slice(index * 5, index * 5 + 5);
  let htmlBooks = arr.map((book) => getBookHtml(book)).join("");
  document.getElementById("listItem").innerHTML += htmlBooks;
  document.getElementById("listItem").innerHTML += getNav();
};

function getNav() {
  return `    <div class="nav">
    <button>prev</button>
    <button>Next</button>
</div>`;
}

function getBookDescription(book) {
  return `<h2 id="book-title">${book.title}</h2>
    <div class="book-details">
      <div class="book-cover">
        <img
          id="book-cover"
          src=${book.coverImageUrl}
          alt="Book Cover"
        />
      </div>
      <div class="book-info">
        <p>Price: ${book.price}</p>
        <div class="book-rating">
          <p>Rating: <span id="book-rating-value">${book.rating}</span>/10</p>
          <button id="minus-btn">-</button>
          <button id="plus-btn">+</button>
        </div>
      </div>
    </div>`;
}

function renderBookDescription(book) {
  document.getElementById("showBook").innerHTML = getBookDescription(book);
}
