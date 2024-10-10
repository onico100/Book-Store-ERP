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
  gBookData = books;
  console.log(gBookData);
  renderBooks(gBookData, 0);
}

function showbookData(bookId) {
  book = gBookData[bookId - 1];
  renderBookDescription(book);
}

function goNext() {
  clearBook();
  index++;
  renderBooks(gBookData, index);
}

function goPrevious() {
  clearBook();
  index--;
  renderBooks(gBookData, index);
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
    books[existingBookIndex] = newBook;
    alert(`Book "${newBook.title}" updated successfully!`);
  } else {
    // Add new book
    books.push(newBook);
    alert(`Book "${newBook.title}" added successfully!`);
  }

  closeSidebar();
}

function deleteBook(bookId) {
  const index = books.findIndex((b) => b.id === bookId);
  if (index !== -1) {
    let title = books[index].title;
    books.splice(index, 1);
    alert(`Book "${title}" deleted successfully!`);
  }
  clearBook();
  renderBooks(gBookData, 0);
}

function updateRating(delta, bookId) {
  // Update book rating in gBookData array
  let bookIndex = gBookData.findIndex((b) => b.id === bookId);
  if (bookIndex !== -1) {
    gBookData[bookIndex].rating += delta;
  }
  showbookData(bookId);
}
