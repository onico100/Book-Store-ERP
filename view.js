const getBookHtml = (book) => {
  return `
    <div class="table">
            <div>${book.id}</div>
            <div onclick="showbookData(${book.id})" style="cursor: pointer; color: blue; text-decoration: underline;">${book.title}</div>
            <div>${book.price}</div>
            <div class="action">
                <button onclick="openSidebar('edit', ${book.id})">${translations[language].edit}</button>
                <img src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" alt="Delete" class="delete-icon" onclick="deleteBook(${book.id})" >
            </div>
          </div>`;
};

const renderBooks = (books, index) => {
  console.log("Rendering books from index", index * 5, "to", index * 5 + 4);
  const arr = books.slice(index * 5, index * 5 + 5);
  console.log("Books to render:", arr);
  let htmlBooks = arr.map((book) => getBookHtml(book)).join("");
  document.getElementById("listItem").innerHTML += htmlBooks;
  document.getElementById("listItem").innerHTML += getNavHtml();
};

function getNavHtml() {
  return `<div class="nav">
    <button onclick="goIndex(--index)">${translations[language].prev}</button>
    ${getPageButtonsHtm()}
    <button onclick="goIndex(++index)">${translations[language].next}</button>
</div>`;
}

function getBookDataHtml(book) {
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
          <p>${translations[language].rating} <span id="book-rating-value">${book.rating}</span>/10</p>
          <button id="minus-btn" onclick="updateRating(-1, ${book.id})">-</button>
          <button id="plus-btn"  onclick="updateRating(1, ${book.id})">+</button>
        </div>
      </div>
    </div>`;
}

function renderBookData(book) {
  document.getElementById("showBook").innerHTML = getBookDataHtml(book);
}

function renderClearBookBoard() {
  document.getElementById("listItem").innerHTML = getHeders();
}

function getHeders() {
  return `<div class="headers">
              <h2>ID</h2>
              <h2 onclick="sortBooksByTitle()" class="pointer">${translations[language].bookHeader}</h2>
              <h2 onclick="sortBooksByPrice()" class="pointer">${translations[language].priceHeader}</h2>
              <h2>${translations[language].action}</h2>
            </div>`;
}

function renderBookEmpty() {
  document.getElementById(
    "showBook"
  ).innerHTML = `<h1>${translations[language].NoBookFound}</h1>`;
}

function getPageButtonsHtm() {
  let buttonsHtml = "";
  for (let i = 0; i < Math.ceil(gBookData.length / 5); i++) {
    buttonsHtml += `<button onclick="goIndex(${i})">${i + 1}</button>`;
  }
  return buttonsHtml;
}

function bodyHtml() {
  document.body.classList.toggle("direction");
  return `<h1>${translations[language].BookStoreERP}</h1>
    <div class="container">
      <div class="topbar">
        <button onclick="openSidebar('add')">${translations[language].newBookBtn}</button>
        <button onclick="loadData()">${translations[language].loadDataBtn}</button>
        <button onclick="translate1()">${translations[language].changeLang}</button>
      </div>
      <div class="main-container">
        <div id="listItem" class="listItem">
          <div class="headers">
              <h2>ID</h2>
              <h2 onclick="sortBooksByTitle()" class="pointer">${translations[language].bookHeader}</h2>
              <h2 onclick="sortBooksByPrice()" class="pointer">${translations[language].priceHeader}</h2>
              <h2>${translations[language].action}</h2>
            </div>
          </div>
          <div id="showBook" class="showBook">
          <h2>${translations[language].showBookData}</h2>
        </div>
        </div>
        
      </div>
      <div id="newBookSidebar" class="sidebar">
        <a href="javascript:void(0)" class="closebtn" onclick="closeSidebar()"
          >&times;</a
        >
        <form id="bookForm" onsubmit="handleSubmit(event)">
          <h2 id="formTitle">${translations[language].newBookBtn}</h2>
          <label for="bookId">ID</label><br />
          <input
            type="number"
            id="bookId"
            name="bookId"
            placeholder="Enter book id"
          /><br />

          <label for="bookName">${translations[language].bookNameLabel}</label><br />
          <input
            type="text"
            id="bookName"
            name="bookName"
            placeholder="Enter book name"
          /><br />

          <label for="bookPrice">${translations[language].bookPriceLabel}</label><br />
          <input
            type="number"
            id="bookPrice"
            name="bookPrice"
            placeholder="Enter price"
          /><br />

          <label for="bookImg">${translations[language].bookImageLabel}</label><br />
          <input
            type="text"
            id="bookImg"
            name="bookImg"
            placeholder="Enter image URL"
          />
          <br />

          <label for="bookRating">${translations[language].rating}</label><br />
          <input
            type="number"
            id="bookRating"
            name="bookRating"
            placeholder="Enter rating"
          /><br />

          <button type="submit" id="submitBtn">${translations[language].submitBtn}</button>
        </form>
      </div>
    </div>
    <script src="dump.js"></script>
    <script src="model.js"></script>
    <script src="controller.js"></script>
    <script src="view.js"></script>
    <script src="lang.js"></script>`;
}

function renderAll() {
  document.body.innerHTML = bodyHtml();
  renderBooks(gBookData, 0);
  renderBookEmpty();
}
