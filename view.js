const getBook = (book) => {
  return `
      <div class="table">
                <div>${book.id}</div>
               <div>${book.title}</div>
               <div>${book.price}</div>
               <div>action</div> 
            </div>`;
};

const renderBooks = (books, index) => {
  const arr = books.slice(index * 5, index * 5 + 5);
  let htmlBooks = arr.map((book) => getBook(book)).join("");
  document.getElementById("listItem").innerHTML = htmlBooks;
};
