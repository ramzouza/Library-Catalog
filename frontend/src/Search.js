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
      <div style={main}>
        <input style={input} type="text" placeholder="Search for a resource ..." ></input>
        <div style={{display:'flex', width: '60%',justifyContent:'space-between'}}>
          Book <input type="checkbox" ></input>
          Magazine <input type="checkbox" ></input>
          Music <input type="checkbox" ></input>
          Movie <input type="checkbox" ></input>
        </div>
        <button style={button} type="button">Search</button>
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