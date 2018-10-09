const objectToQueryString = require("./UserCatalog").objectToQueryString
const Book = require('./Book')
let books=[]

class ResourceCatalog {
  static MakeNewBook(book_data) {
    const newBook = new Book(book_data)
    if (books[newBook.ISBN_10]) {
      return { status: 1, message: "A book with the same ISBN 10 already exists" }
    }
    books[newBook.ISBN_10] = newBook
    return { status: 0, message: "Saved book" }
  }
}

module.exports = ResourceCatalog;
