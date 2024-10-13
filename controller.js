function openSidebar(action, bookId = null) {
  const sidebar = document.getElementById("sidebar");
  const formTitle = document.getElementById("formTitle");
  const submitBtn = document.getElementById("submitBtn");

  if (action === "add") {
    formTitle.textContent = "Add New Book";
    submitBtn.textContent = "Add Book";
    document.getElementById("bookForm").reset();
  } else if (action === "edit" && bookId) {
    let book = gBookData.find((b) => b.id === bookId);
    formTitle.textContent = "Update Book";
    submitBtn.textContent = "Update Book";

    // Populate form with existing book data
    document.getElementById("bookId").value = book.id;
    document.getElementById("bookName").value = book.title;
    document.getElementById("bookPrice").value = book.price;
    document.getElementById("bookImg").value = book.coverImageUrl;
    document.getElementById("bookRating").value = book.rating;
  }
  document.getElementById("newBookSidebar").style.width = "400px";
}

function closeSidebar() {
  document.getElementById("newBookSidebar").style.width = "0";
}

function initShop() {
  gBookData = getObjFromLS("bookData") || books;
  index = getFromLocalStorage("index") || -1;
  gBookDataIndex = Number(getFromLocalStorage("bookDataIndex") || -1);
  console.log("shopIndex = " + gBookDataIndex);
  showbookData(gBookDataIndex);
  renderBooks(gBookData, index);
}

function showbookData(bookId) {
  console.log(gBookData);
  console.log("showing book data for bookId = " + bookId);
  book = gBookData.find((b) => b.id === bookId);
  console.log(book);
  if (book == -1) {
    renderBookEmpty();
    return;
  }

  gBookDataIndex = bookId;
  saveObjToLS("bookDataIndex", Number(gBookDataIndex));
  renderBookData(book);
}

function goIndex(num) {
  if (num < 0) num = 0;
  if (num >= Math.ceil(gBookData.length / 5))
    num = Math.ceil(gBookData.length / 5) - 1;
  clearBook();

  index = num;
  saveObjToLS("index", Number(num));
  renderBooks(gBookData, num);
}

function clearBook() {
  renderClearBookBoard();
}

function handleSubmit(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Get values from form inputs
  const bookId = document.getElementById("bookId").value;
  const bookName = document.getElementById("bookName").value;
  const bookPrice = document.getElementById("bookPrice").value;
  const bookImg = document.getElementById("bookImg").value;
  const bookRating = document.getElementById("bookRating").value;

  // Validate inputs
  if (!bookId || !bookName || !bookPrice || !bookImg) {
    alert("Please fill out all fields");
    return;
  }

  // Create a new book object
  const newBook = {
    id: parseInt(bookId),
    title: bookName,
    price: parseFloat(bookPrice),
    coverImageUrl: bookImg,
    rating: bookRating,
  };
  const existingBookIndex = books.findIndex((b) => b.id === newBook.id);
  if (existingBookIndex !== -1) {
    // Update existing book
    gBookData[existingBookIndex] = newBook;
    alert(`Book "${newBook.title}" updated successfully!`);
  } else {
    // Add new book
    gBookData.push(newBook);
    alert(`Book "${newBook.title}" added successfully!`);
  }

  saveObjToLS("bookData", gBookData);
  clearBook();
  renderBooks(gBookData, index);
  renderBookData(newBook);

  closeSidebar();
}

function deleteBook(bookId) {
  const Bindex = gBookData.findIndex((b) => b.id === bookId);
  if (Bindex !== -1) {
    let title = gBookData[Bindex].title;
    gBookData.splice(Bindex, 1);
    alert(`Book "${title}" deleted successfully!`);
  }
  if (gBookDataIndex == bookId) {
    gBookDataIndex = -1;
    showbookData(gBookDataIndex);
    saveObjToLS("bookDataIndex", gBookDataIndex);
  }
  saveObjToLS("bookData", gBookData);
  clearBook();
  if (Bindex == index * 5) index--;
  renderBooks(gBookData, index);
}

function updateRating(delta, bookId) {
  // Update book rating in gBookData array
  let bookIndex = gBookData.findIndex((b) => b.id === bookId);
  if (bookIndex !== -1) {
    newRate = parseInt(gBookData[bookIndex].rating) + delta;
    gBookData[bookIndex].rating = newRate;
    saveObjToLS("bookData", gBookData);
  }
  showbookData(bookId);
}

function getObjFromLS(key) {
  return JSON.parse(getFromLocalStorage(key));
}

function getFromLocalStorage(key) {
  return localStorage.getItem(key);
}

function saveObjToLS(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

function sortBooksByTitle() {
  gBookData.sort((a, b) => a.title.localeCompare(b.title));
  console.log("Books sorted by title:", books);
  updateSort();
}

// Function to sort books by price
function sortBooksByPrice() {
  gBookData.sort((a, b) => a.price - b.price);
  console.log("Books sorted by price:", books);
  updateSort();
}

function updateSort() {
  clearBook();
  renderBooks(gBookData, 0);
}

function loadData() {
  gBookData = books;
  index = 0;
  saveObjToLS("bookData", gBookData);
  clearBook();
  renderBooks(gBookData, 0);
}
