const Resource = require('./Resource.js')

class Book extends Resource{
    constructor({title,author, format,pages,publisher,language, isbn_10, isbn_13}, id=-1) {
        super(title, id);
        this.author = author
        this.format = format
        this.pages = pages
        this.publisher = publisher
        this.language = language
        this.isbn_10 = isbn_10
        this.isbn_13 = isbn_13
    }

}

module.exports = Book
