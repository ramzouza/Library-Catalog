const Resource = require('./Resource.js')

class Magazine extends Resource {

    constructor({title,publisher, language, isbn_10, isbn_13}, id=-1){
        super(title, id);
        this.publisher = publisher
        this.language = language
        this.isbn_10 = isbn_10
        this.isbn_13 = isbn_13
    }

}

module.exports = Magazine 