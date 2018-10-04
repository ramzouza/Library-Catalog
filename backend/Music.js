const Resource = require('./Resource.js')

class Music extends Resource {
    constructor(title,type,artist,label,release,ASIN){
        super(title)
        this.type = type
        this.artist = artist
        this.release = release
        this.ASIN = ASIN
        this.label = label
    }
} 

module.exports = Music