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
  showbookData(2);
}

function showbookData(bookId) {
  book = gBookData[bookId - 1];
  renderBookDescription(book);
}
