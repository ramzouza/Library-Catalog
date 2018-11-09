const Resource = require('./Resource.js')

class Movie extends Resource{
    constructor( {title, director, producers, actors, language, subtitles, dubbed, release, run_time}, id=-1 )
    {
     super(title, id);
     this.director = director
     this.producers = producers
     this.actors = actors
     this.language = language
     this.subtitles = subtitles
     this.dubbed = dubbed
     this.release = release
     this.run_time = run_time   
    }
} 

module.exports = Movie