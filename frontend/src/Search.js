import React, { Component } from 'react';
import {GET} from './ApiCall';
class Search extends Component {

  constructor(){
    super()

    this.state = {
      resource_list: []
    }
    this.advancedSearch = {
      title: "",
      author: "",
      ISBN: "",
      Movie: 0,
      Book: 0,
      Magazine: 0,
      Music: 0,
      author_dropdown: [],
      director_dropdown: [],
      publisher_dropdown: [],
      artist_dropdown: [],
      pickedAuthor: "",
      pickedDirector: "",
      pickedPublisher: "",
      pickedArtist: "",
      titleSearch: "",
      ISBNSearch: ""
    }
  }

  handlePickedAuthor(event) {
    this.setState({pickedAuthor: event.target.value})
  }
  handlePickedDirector(event) {
    this.setState({pickedDirector: event.target.value})
  }
  handlePickedPublisher(event) {
    this.setState({pickedPublisher: event.target.value})
  }
  handlePickedArtist(event) {
    this.setState({pickedArtist: event.target.value})
  }

  handleClickSearch(){
    const{pickedAuthor, pickedDirector, pickedPublisher, pickedArtist, titleSearch, ISBNSearch } = this.state
    let checked = []
    if(this.refs.book.checked) checked.push("book")
    if(this.refs.magazine.checked) checked.push("magazine")
    if(this.refs.music.checked) checked.push("music")
    if(this.refs.movie.checked) checked.push("movie")

    const queryObject = {pickedAuthor, pickedDirector, pickedPublisher, pickedArtist, titleSearch, ISBNSearch, checked}
    console.log({queryObject})

    // Todo : POST('/search...', queryObject)
  }
  handleClickAdvancedSearch(){
    let author_dropdown =[];
    let director_dropdown =[];
    let publisher_dropdown =[];
    let artist_dropdown =[];
    
    GET('/author')
        .then( res => res.json() )
        .then ( json => {
         json.results.results.forEach(function(item){ 
          author_dropdown.push(item.author);
        });
        this.setState({author_dropdown})
        
        })
        GET('/director')
        .then( res => res.json() )
        .then ( json => {
         json.results.results.forEach(function(item){ 
          director_dropdown.push(item.director);
        });
        this.setState({director_dropdown})
        
        })

        GET('/publisher')
        .then( res => res.json() )
        .then ( json => {
         json.results.results.forEach(function(item){ 
          publisher_dropdown.push(item.publisher);
        });
        this.setState({publisher_dropdown})
        
        })

        
        GET('/artist')
        .then( res => res.json() )
        .then ( json => {
          console.log({json})
         json.results.results.forEach(function(item){ 
          artist_dropdown.push(item.artist);
        });
        this.setState({artist_dropdown})
        
        })

}
  render() {
    const {resource_list, author_dropdown, director_dropdown, publisher_dropdown,artist_dropdown} = this.state;

    console.log(resource_list);
    return (
      <div>
        <div style={main}>
          <input style={input} type="text" placeholder="Search for a resource ..." ></input>
          <button  onClick={() => this.handleClickAdvancedSearch()}  data-toggle="modal" data-target="#myModal" ><img alt="advanced search" src= "../images/advancedSearch.png" /> </button>
        </div>

        <div>
          <button style={button} type="button">Search</button>
        </div>

        <div>
        
        <div class="container">

          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
            
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                  <h4 class="modal-title">Advanced Search</h4>
                </div>
                <div class="modal-body">
                <span>Type : </span>
                 <input id= "advanced_checkbox_book" type="checkbox" name="book" value="book" ref ="book"/> Book &nbsp;
                 <input id= "advanced_checkbox_magazine"  type="checkbox" name="magazine" value="magazine" ref="magazine" /> Magazine &nbsp;
                 <input id= "advanced_checkbox_movie" type="checkbox" name="movie" value="movie" ref="movie" /> Movie &nbsp;
                 <input id= "advanced_checkbox_music" type="checkbox" name="music" value="music" ref="music"/> Music &nbsp;<br></br>
                 <span>Title  : </span><input onChange={ e => this.setState({titleSearch: e.target.value})} id= "advanced_title"></input><br></br>
                 <span>ISBN : </span><input onChange={ e => this.setState({ISBNSearch: e.target.value})} id= "advanced_isbn"></input><br></br>
             
                  <div class="dropdown">
                    
                    <span>Author</span>
                    <select onChange={ e => this.handlePickedAuthor(e)} ref="userInput" defaultValue="" required>
                  <option value="" disabled>User</option>
                {author_dropdown ? 
                  author_dropdown.map(function(username) {
                    console.log(username)
                  return <option key={username}
                          value={username}>{username}</option>;
                }) 
                : null
              }
                   </select>
                  
                  </div>
                  <div class="dropdown">
                    
                    <span>Director</span>
                    <select onChange={ e => this.handlePickedDirector(e)} ref="userInput" defaultValue="" required>
                  <option value="" disabled>User</option>
                {director_dropdown ? 
                  director_dropdown.map(function(username) {
                    console.log(username)
                  return <option key={username}
                          value={username}>{username}</option>;
                }) 
                : null
              }
                   </select>
                  
                  </div>

                   <div class="dropdown">
                    
                    <span>Publisher</span>
                    <select onChange={ e => this.handlePickedPublisher(e)} ref="userInput" defaultValue="" required>
                  <option value="" disabled>User</option>
                {publisher_dropdown ? 
                  publisher_dropdown.map(function(username) {
                    console.log(username)
                  return <option key={username}
                          value={username}>{username}</option>;
                }) 
                : null
              }
                   </select>
                  
                  </div>
                  <div class="dropdown">
                    
                    <span>Artist</span>
                    <select onChange={ e => this.handlePickedArtist(e)} ref="userInput" defaultValue="" required>
                  <option value="" disabled>User</option>
                {artist_dropdown ? 
                  artist_dropdown.map(function(username) {
                    console.log(username)
                  return <option key={username}
                          value={username}>{username}</option>;
                }) 
                : null
              }
                   </select>
                  
                  </div>
                </div>
                <div class="modal-footer">
                <button type="button" onClick={ _ => this.handleClickSearch()} class="btn btn-default">Search</button>
                  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
        </div>
     </div>
     
    );
    
  }
}

export default Search;
const  main = {
    minWidth: '30%',
    display:'flex',
    flexDirection: 'row',
    
}

const input = {
    fontSize: 30,
    padding: '15px 15px',
    textAlign: 'left',
    fontFamily: 'Impact',
    borderRadius: 2,
    width: '100%'
}
const button = {
  fontSize: 20,
  borderRadius: 5,
  fontFamily: 'inherit',
  padding: '5px 40px',
  margin: 10,
  // boxShadow: '0px 5px 5px rgba(0,0,0,0.5)',
}