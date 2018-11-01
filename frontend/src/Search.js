import React, { Component } from 'react';

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
    
    }
  }
  handleClickAdvancedSearch(){
    var title = document.getElementById("advanced_title").value;
    var author = document.getElementById("advanced_author").value;
    var isbn = document.getElementById("advanced_isbn").value;
    var advanced_checkbox_book= document.getElementById("advanced_checkbox_book").value;
    var advanced_checkbox_movie= document.getElementById("advanced_checkbox_movie").value;
    var advanced_checkbox_magazine= document.getElementById("advanced_checkbox_magazine").value;
    var advanced_checkbox_music= document.getElementById("advanced_checkbox_music").value;
}
  render() {
    const {resource_list} = this.state;
    console.log(resource_list);
    return (
      <div>
        <div style={main}>
          <input style={input} type="text" placeholder="Search for a resource ..." ></input>
          <button  data-toggle="modal" data-target="#myModal" ><img alt="advanced search" src= "../images/advancedSearch.png" /> </button>
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
                 <span>Title  : </span><input id= "advanced_title"></input><br></br>
                 <span>Author : </span><input id= "advanced_author" ></input><br></br>
                 <span>ISBN : </span><input id= "advanced_isbn"></input><br></br>
                 <span>Type : </span>
                 <input id= "advanced_checkbox_book" type="checkbox" name="book" value="book" /> Book &nbsp;
                 <input id= "advanced_checkbox_magazine"  type="checkbox" name="magazine" value="magazine" /> Magazine &nbsp;
                 <input id= "advanced_checkbox_movie" type="checkbox" name="movie" value="movie" /> Movie &nbsp;
                 <input id= "advanced_checkbox_music" type="checkbox" name="music" value="music" /> Music &nbsp;
                 
                </div>
                <div class="modal-footer">
                <button type="button" onClick={() => this.handleClickAdvancedSearch()} class="btn btn-default">Search</button>
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