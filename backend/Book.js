const Resource = require('./resource.js')

class Book extends Resource{
    constructor({title,author, format,pages,publisher,language, ISBN_10, ISBN_13}){
        super(title)
        this.author = author
        this.format = format
        this.pages = pages
        this.publisher = publisher
        this.language = language
        this.ISBN_10 = ISBN_10
        this.ISBN_13 = ISBN_13
    }

}

module.exports = Book
