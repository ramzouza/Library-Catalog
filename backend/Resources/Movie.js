const Resource = require('./Resource.js')

class Movie extends Resource{
    constructor({title,director, producers, actors, language, subtitles, dubbed, release, time})
    {
     super(title, id, instance);
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