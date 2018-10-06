const objectToQueryString = require("./UserCatalog").objectToQueryString
const Book = require('./Book')
let resources=[]

class ResourceCatalog {
  static MakeNewBook(book_data) {
    const newBook = new Book(book_data)
    if (resources[newBook.ISBN_10]) {
      return { status: 1, message: "A book with the same ISBN 10 already exists" }
    }
    resources[newBook.ISBN_10] = newBook
    console.log('resources -->', resources)
    return { status: 0, message: "Saved book" }
  }
}

module.exports = ResourceCatalog;
