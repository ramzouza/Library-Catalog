import React, { Component } from 'react';
import {GET,PUT} from './ApiCall';

class Search extends Component {

  constructor(){
    super()

    this.state = {
      resource_list: []
    }
  }

  handleClickEdit(id){
  
    const title = document.getElementById(id).value
    const res = {id,title}
 


 PUT('/resources', {"resource_data": res})
  .then( res => res.json() )
  .then ( json => {
    alert(json.message)
    if(json.status == 0){
      let resource_list = this.state.resource_list
      resource_list[id].title=title
    }
  })
      
  }
  componentDidMount(){
    
    GET('/resources')
      .then(res => res.json())
      .then( json => {

        console.log("===== DATABASE ======");
        console.log(json.results);
        console.log("======================");
        delete json.results[0]
        this.setState({resource_list: json.results})
      })
  }


  render() {
    const {resource_list} = this.state;
    console.log(resource_list);
    return (
      <div style={main}>
        <input style={input} type="text" placeholder="Search for a resource ..." ></input>
        <div style={{display:'flex', width: '60%',justifyContent:'space-between'}}>
          Book <input type="checkbox" ></input>
          Magazine <input type="checkbox" ></input>
          Music <input type="checkbox" ></input>
          Movie <input type="checkbox" ></input>
        </div>
        <button style={button} type="button">Search</button>

        <h1>High Quality Database</h1>
        {resource_list.map( ({id, title }) => <div key={id}><input  type="text" disabled value={id}/> 
         <input id={id} type="text"  defaultValue={title} />
         <button style={button} onClick={() => this.handleClickEdit(id)} type="button">Edit </button>
         </div> )}

      </div>
    );
  }
}

export default Search;
const  main = {
    minWidth: '30%',
    display:'flex',
    flexDirection: 'column',
    alignItems:'center',
    
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