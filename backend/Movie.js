const Resource = require('./Resource.js')

class movie{
    constructor(director, producers, actors, language, subtitles, dubbed, release, time)
    {
     this.director = director
     this.producers = producers
     this.actors = actors
     this.language = language
     this.subtitles = subtitles
     this.dubbed = dubbed
     this.release = release
     this.time = time   
    }
} 

module.exports = Movie