import React, { Component } from 'react';
import {GET, POST} from './ApiCall';
import SearchResult from './SearchResult.js';
import Loading from 'react-loading-components';

class Search extends Component {

  constructor(){
    super()
    this.state = {
      resource_list: [],
      TotalArray: []
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
      ISBNSearch: "",
      loading: false,
    }
  }


  
  handleClick(){
    let SearchRandom = document.getElementById("SearchRandom").value;
    this.setState({loading: true, TotalArray: []})
    POST('/resource', {"resource_data": SearchRandom,isFilter:false})
        .then( res => res.json() )
        .then ( json => {
          let TotalArray = json.results;
          this.setState({TotalArray}, () => this.setState({loading: false}))
        }).catch( err => {
          this.setState({loading: false})
        })
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
    

    POST('/resource', {"resource_data": queryObject,isFilter:true})
        .then( res => res.json() )
        .then ( json => {

          let TotalArray = json.results;
          this.setState({TotalArray})

          // SEARCH ADVANCED 
        })
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
         json.results.results.forEach(function(item){ 
          artist_dropdown.push(item.artist);
        });
        this.setState({artist_dropdown})
        
        })

}
  
_handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({"loading":true})
      this.handleClickSearch()
    }
  }

render() {
    const {loading, TotalArray, resource_list, author_dropdown, director_dropdown, publisher_dropdown,artist_dropdown} = this.state;

    console.log(TotalArray);
    


    return (
      <div>
        <div style={main}>
        <input onKeyPress={this._handleKeyPress.bind(this)} id="SearchRandom" type="text" placeholder="Search for a resource ..." ></input>
        </div>

        <div>
          <button  class="btn btn-default btn-search" onClick={() => this.handleClick()} type="button">Search</button>
          <button  class="btn btn-default btn-search" onClick={() => this.handleClickAdvancedSearch()}  data-toggle="modal" data-target="#myModal" >Advanced Search</button>
        </div>

        <div>
        
        <div class="container">

          <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
            
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Advanced Search</h4>
                  <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                <label>Type : </label><br></br>
            <div class="form-check form-check-inline">
            <input class="form-check-input" id="advanced_checkbox_book" type="checkbox" name="book" value="book" ref ="book"/> 
              <label class="form-check-label" for="advanced_checkbox_book">Book</label>
            </div>
            
            <div class="form-check form-check-inline">
            <input class="form-check-input" id="advanced_checkbox_magazine"  type="checkbox" name="magazine" value="magazine" ref="magazine" />
              <label class="form-check-label" for="advanced_checkbox_magazine">Magazine</label>
            </div>

              <div class="form-check form-check-inline">
              <input class="form-check-input" id="advanced_checkbox_movie" type="checkbox" name="movie" value="movie" ref="movie" />
              <label class="form-check-label" for="advanced_checkbox_movie">Movie</label>
              </div>

              <div class="form-check form-check-inline">
              <input class="form-check-input" id="advanced_checkbox_music" type="checkbox" name="music" value="music" ref="music"/> 
              <label class="form-check-label" for="advanced_checkbox_music">Movie</label>
              </div>
            
            <div class="form-group">
             <label for="advanced_title">Title</label>
             <input onChange={ e => this.setState({titleSearch: e.target.value})} class="form-control" id= "advanced_title"></input>
            </div>

            <div class="form-group">
             <label for="advanced_isbn">ISBN</label>
             <input onChange={ e => this.setState({ISBNSearch: e.target.value})} class="form-control"  id= "advanced_isbn"></input>
             </div>

        <div class="dropdown">
       
        <label for="author_select">Author</label>
        <select class="custom-select" id="author_select" onChange={ e => this.handlePickedAuthor(e)} ref="userInput" defaultValue="" required>
                  <option value="" disabled>User</option>
                {author_dropdown ? 
                  author_dropdown.map(function(username) {
                  return <option key={username}
                          value={username}>{username}</option>;
                }) 
                : null
              }
                   </select>
        </div>
                  <div class="dropdown">
                    
                    <label for="director_select">Director</label>
                    <select class="custom-select" id="director_select"  onChange={ e => this.handlePickedDirector(e)} ref="userInput" defaultValue="" required>
                  <option value="" disabled>User</option>
                {director_dropdown ? 
                  director_dropdown.map(function(username) {
                  return <option key={username}
                          value={username}>{username}</option>;
                }) 
                : null
              }
                   </select>
                  
                  </div>

                   <div class="dropdown">
                    
                   <label for="publisher_select">Publisher</label>
                    <select class="custom-select" id="publisher_select" onChange={ e => this.handlePickedPublisher(e)} ref="userInput" defaultValue="" required>
                  <option value="" disabled>User</option>
                {publisher_dropdown ? 
                  publisher_dropdown.map(function(username) {
                  return <option key={username}
                          value={username}>{username}</option>;
                }) 
                : null
              }
                   </select>
                  
                  </div>
                  <div class="dropdown">
                    
                    <label for="artist_select">Artist</label>
                    <select class="custom-select" id="artist_select" onChange={ e => this.handlePickedArtist(e)} ref="userInput" defaultValue="" required>
                  <option value="" disabled>User</option>
                {artist_dropdown ? 
                  artist_dropdown.map(function(username) {
                  return <option key={username}
                          value={username}>{username}</option>;
                }) 
                : null
              }
                   </select>
                  
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" onClick={ _ => this.handleClickSearch()} class="btn btn-primary" data-dismiss="modal">Search</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
              </div>
              
            </div>
          </div>
          
        </div>
        </div>


        {TotalArray.map( resource => <SearchResult key={resource.resource_id} id={resource.resource_id} type={resource.restype} resource={resource} />)}
        
         <div style ={loader}>     
        {loading ? <Loading type='tail_spin' width={100} height={100} fill='#037d9e'   /> : null}  
          </div>
     </div>
     
    );
    
  }
}

export default Search;
const  main = {
    minWidth: '30%'
}



const loader ={
  width:  '100%',
  display: 'flex',
  justifyContent: 'center' 
}