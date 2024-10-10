const getBookHtml = (book) => {
  return `
    <div class="table">
            <div>${book.id}</div>
            <div onclick="showbookData(${book.id})" style="cursor: pointer; color: blue; text-decoration: underline;">${book.title}</div>
            <div>${book.price}</div>
            <div>
                <button onclick="deleteBook(${book.id})">Delete</button>
                <button onclick="openSidebar('edit', ${book.id})">Edit</button>
            </div>
          </div>`;
};

const renderBooks = (books, index) => {
  if (index * 5 >= books.length) index--;
  console.log("Rendering books from index", index * 5, "to", index * 5 + 4);
  const arr = books.slice(index * 5, index * 5 + 5);
  let htmlBooks = arr.map((book) => getBookHtml(book)).join("");
  document.getElementById("listItem").innerHTML += htmlBooks;
  document.getElementById("listItem").innerHTML += getNav();
};

function getNav() {
  return `    <div class="nav">
    <button onclick="goPrevious()">prev</button>
    <button onclick="goNext()">Next</button>
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
          <button id="minus-btn" onclick="updateRating(-1, ${book.id})">-</button>
          <button id="plus-btn"  onclick="updateRating(1, ${book.id})">+</button>
        </div>
      </div>
    </div>`;
}

function renderBookDescription(book) {
  document.getElementById("showBook").innerHTML = getBookDescription(book);
}

function renderClearBookBoard() {
  document.getElementById("listItem").innerHTML = getHeders();
}

function getHeders() {
  return `  <div class="headers">
              <h2>id</h2>
              <h2 onclick="sortBooksByTitle()">Book</h2>
              <h2 onclick="sortBooksByPrice()">Price</h2>
              <h2>action</h2>
          </div>`;
}
