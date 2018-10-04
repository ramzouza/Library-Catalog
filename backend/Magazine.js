const Resource = require('./Resource.js')

class Magazine {

    constructor(publisher, language, ISBN_10, ISBN_13){
        this.publisher = publisher
        this.language = language
        this.ISBN_10 = ISBN_10
        this.ISBN_13 = ISBN_13
    }

}

module.exports = Magazine 