import React, { Component } from 'react';

class Search extends Component {

  constructor(){
    super()

    this.state = {
      resource_list: []
    }
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
                 <span>Title  : </span><input></input><br></br>
                 <span>Author : </span><input></input><br></br>
                 <span>ISBN : </span><input></input><br></br>
                 <span>Type : </span>
                 <input type="checkbox" name="book" value="book" /> Book &nbsp;
                 <input type="checkbox" name="magazine" value="magazine" /> Magazine &nbsp;
                 <input type="checkbox" name="movie" value="movie" /> Movie &nbsp;
                 <input type="checkbox" name="music" value="music" /> Music &nbsp;
                 
                </div>
                <div class="modal-footer">
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