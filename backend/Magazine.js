const Resource = require('./Resource.js')

class Magazine extends Resource {

    constructor({title,publisher, language, ISBN_10, ISBN_13}){
        super(title)
        this.publisher = publisher
        this.language = language
        this.ISBN_10 = ISBN_10
        this.ISBN_13 = ISBN_13
    }

}

module.exports = Magazine 