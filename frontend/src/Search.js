import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div style={main}>
        <input style={input} type="text" placeholder="Search for a resource ..." ></input>
        <button style={button} type="button">Search</button>
      </div>
    );
  }
}

export default Search;
const  main = {
    minWidth: '30%',
    display:'flex',
    flexDirection: 'row',
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
  padding: '15px 10px',
  margin: 10,
  // boxShadow: '0px 5px 5px rgba(0,0,0,0.5)',

}