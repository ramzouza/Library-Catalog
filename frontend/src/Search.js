import React, { Component } from 'react';
import {GET, POST} from './ApiCall';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { func } from 'prop-types';
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
  handleClick(){
    let SearchRandom = document.getElementById("SearchRandom").value;
    POST('/resource', {"resource_data": SearchRandom,isFilter:false})
        .then( res => res.json() )
        .then ( json => {
          alert(JSON.stringify(json.results))
          
        })}
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
          alert(JSON.stringify(json.results))
          var TotalArray = json.results;
          
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
          console.log({json})
         json.results.results.forEach(function(item){ 
          artist_dropdown.push(item.artist);
        });
        this.setState({artist_dropdown})
        
        })

}
  

render() {
    const {resource_list, author_dropdown, director_dropdown, publisher_dropdown,artist_dropdown} = this.state;

    var BookArray=[];
    var MagazineArray=[];
    var MovieArray=[];
    var MusicArray=[];

    for(var i=0; i<TotalArray.length; i++ ){
      if(TotalArray[i].restype === "book"){
        TotalArray[i]['index'] = BookArray.length;
        BookArray.push(TotalArray[i]);
      }
      if(TotalArray[i].restype === "magazine"){
        TotalArray[i]['index'] = MagazineArray.length;
        MagazineArray.push(TotalArray[i]);
      }
      if(TotalArray[i].restype === "movie"){
        TotalArray[i]['index'] = MovieArray.length;
        MovieArray.push(TotalArray[i]);
      }
      if(TotalArray[i].restype === "music"){
        TotalArray[i]['index'] = MusicArray.length;
        MusicArray.push(TotalArray[i]);
      }
    }

    console.log(resource_list);
    return (
      <div>
        <div style={main}>
          <input style={input} id="SearchRandom" type="text" placeholder="Search for a resource ..." ></input>
          <button  onClick={() => this.handleClickAdvancedSearch()}  data-toggle="modal" data-target="#myModal" ><img alt="advanced search" src= "../images/advancedSearch.png" /> </button>
        </div>

        <div>
          <button style={button} onClick={() => this.handleClick()} type="button">Search</button>
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
        <h1>Book Results</h1>
          <BootstrapTable id="booktable" hidden data={BookArray} options={ { noDataText: 'This is custom text for empty data' } }options={options}>
          <TableHeaderColumn dataField='id' dataAlign='center' width='150' dataSort={ true }>Id</TableHeaderColumn>
          <TableHeaderColumn hidden dataField='restype' dataAlign='center' width='150' dataSort={ true }>Resource type</TableHeaderColumn>
          <TableHeaderColumn dataField='title' dataAlign='center' width='150' isKey={ true } dataSort={ true } >Title</TableHeaderColumn>
          <TableHeaderColumn dataField='loan' dataAlign='center' width='150' dataSort={ true }>Loan</TableHeaderColumn>
          <TableHeaderColumn dataField='available' dataAlign='center' width='150' dataSort={ true }>Available</TableHeaderColumn>
          <TableHeaderColumn dataField='author' dataAlign='center' width='150' dataSort={ true }>Author</TableHeaderColumn>
          <TableHeaderColumn dataField='format' dataAlign='center' width='150' dataSort={ true }>Format</TableHeaderColumn>
          <TableHeaderColumn dataField='pages' dataAlign='center' width='150' dataSort={ true }>Pages</TableHeaderColumn>
          <TableHeaderColumn dataField='publisher' dataAlign='center' width='150' dataSort={ true }>Publisher</TableHeaderColumn>
          <TableHeaderColumn dataField='language' dataAlign='center' width='150' dataSort={ true }>Language</TableHeaderColumn>
          <TableHeaderColumn dataField='ISBN_10' dataAlign='center' width='150' dataSort={ true }>ISBN_10</TableHeaderColumn>
          <TableHeaderColumn dataField='ISBN_13' dataAlign='center' width='150' dataSort={ true }>ISBN_13</TableHeaderColumn>
          <TableHeaderColumn hidden dataField='index' dataAlign='center' width='150' dataSort={ true }>Index</TableHeaderColumn>
          
          </BootstrapTable>
          <h1>Magazine Results</h1>
          <BootstrapTable id="magazinetable" class="hidden" data={MagazineArray} options={ { noDataText: 'This is custom text for empty data' } }options={options}>
          <TableHeaderColumn dataField='id' dataAlign='center' isKey={ true } width='150' dataSort={ true } >ID</TableHeaderColumn>
          <TableHeaderColumn hidden dataField='restype' dataAlign='center' width='150' dataSort={ true }>Resource type</TableHeaderColumn>
          <TableHeaderColumn dataField='title' dataAlign='center' width='150' dataSort={ true }>Title</TableHeaderColumn>
          <TableHeaderColumn dataField='loan' dataAlign='center' width='150' dataSort={ true }>Loan</TableHeaderColumn>
          <TableHeaderColumn dataField='available' dataAlign='center' width='150' dataSort={ true }>Available</TableHeaderColumn>
          <TableHeaderColumn dataField='publisher' dataAlign='center' width='150' dataSort={ true }>Publisher</TableHeaderColumn>
          <TableHeaderColumn dataField='language' dataAlign='center' width='150' dataSort={ true }>Language</TableHeaderColumn>
          <TableHeaderColumn dataField='ISBN_10' dataAlign='center' width='150' dataSort={ true }>ISBN_10</TableHeaderColumn>
          <TableHeaderColumn dataField='ISBN_13' dataAlign='center' width='150' dataSort={ true }>ISBN_13</TableHeaderColumn>
          <TableHeaderColumn hidden dataField='index' dataAlign='center' width='150' dataSort={ true }>Index</TableHeaderColumn>
          </BootstrapTable>
          <h1>Movies Results</h1>
          <BootstrapTable id="movietable" style="visibility:hidden" data={MovieArray} options={ { noDataText: 'This is custom text for empty data' } }options={options}>
          <TableHeaderColumn dataField='id' dataAlign='center' width='150' dataSort={ true }>Id</TableHeaderColumn>
          <TableHeaderColumn hidden dataField='restype' dataAlign='center' width='150' dataSort={ true }>Resource type</TableHeaderColumn>
          <TableHeaderColumn dataField='title' isKey={ true } dataAlign='center' width='150' dataSort={ true } >Title</TableHeaderColumn>
          <TableHeaderColumn dataField='loan' dataAlign='center' width='150' dataSort={ true }>Loan</TableHeaderColumn>
          <TableHeaderColumn dataField='available' dataAlign='center' width='150' dataSort={ true }>Available</TableHeaderColumn>
          <TableHeaderColumn dataField='director' dataAlign='center' width='150' dataSort={ true }>Director</TableHeaderColumn>
          <TableHeaderColumn dataField='producers' dataAlign='center' width='150' dataSort={ true }>Producers</TableHeaderColumn>
          <TableHeaderColumn dataField='actors' dataAlign='center' width='150' dataSort={ true }>Actors</TableHeaderColumn>
          <TableHeaderColumn dataField='subtitles' dataAlign='center' vwidth='150' dataSort={ true }>Subtitles</TableHeaderColumn>
          <TableHeaderColumn dataField='language' dataAlign='center' width='150' dataSort={ true }>Language</TableHeaderColumn>
          <TableHeaderColumn dataField='dubbed' dataAlign='center' width='150' dataSort={ true }>Dubbed</TableHeaderColumn>
          <TableHeaderColumn dataField='release' dataAlign='center' width='150' dataSort={ true }>Release</TableHeaderColumn>
          <TableHeaderColumn dataField='runtime' dataAlign='center' width='150' dataSort={ true }>Run Time</TableHeaderColumn>
          <TableHeaderColumn hidden dataField='index' dataAlign='center' width='150' dataSort={ true }>Index</TableHeaderColumn>
          </BootstrapTable>
          <h1>Music Results</h1>
          <BootstrapTable id="musictable" style="visibility:hidden" data={MusicArray} options={ { noDataText: 'This is custom text for empty data' } }options={options}>
          <TableHeaderColumn dataField='id' dataAlign='center' width='150' dataSort={ true }>Id</TableHeaderColumn>
          <TableHeaderColumn hidden dataField='restype' dataAlign='center' width='150' dataSort={ true }>Resource type</TableHeaderColumn>
          <TableHeaderColumn dataField='title' isKey={ true } dataAlign='center' width='150' dataSort={ true } >Title</TableHeaderColumn>
          <TableHeaderColumn dataField='loan' dataAlign='center' width='150' dataSort={ true }>Loan</TableHeaderColumn>
          <TableHeaderColumn dataField='available' dataAlign='center' width='150' dataSort={ true }>Available</TableHeaderColumn>
          <TableHeaderColumn dataField='type' dataAlign='center' width='150' dataSort={ true }>Type</TableHeaderColumn>
          <TableHeaderColumn dataField='artist' dataAlign='center' width='150' dataSort={ true }>Artist</TableHeaderColumn>
          <TableHeaderColumn dataField='release' dataAlign='center' width='150' dataSort={ true }>Release</TableHeaderColumn>
          <TableHeaderColumn dataField='ASIN' dataAlign='center' width='150' dataSort={ true }>ASIN</TableHeaderColumn>
          <TableHeaderColumn dataField='label' dataAlign='center' width='150' dataSort={ true }>Label</TableHeaderColumn>
          <TableHeaderColumn hidden dataField='index' dataAlign='center' width='150' dataSort={ true }>Index</TableHeaderColumn>
          </BootstrapTable>
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