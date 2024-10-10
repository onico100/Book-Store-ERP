function openSidebar() {
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

  // Add the new book to the array
  gBookData.push(newBook);

  //reset the form
  alert("Book added successfully!");
}
