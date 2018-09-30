import React, { Component } from 'react';

class NewUser extends Component {
  render() {
    return (
      <div style={main} >
        <span style={{fontWeight: 'bold'}} >New User</span>
        
        <input style={input} type="text" placeholder="First Name" ></input>

        <input style={input} type="text" placeholder="Last Name" ></input>
        
        <input style={input} type="text" placeholder="Password" ></input>
        
        <input style={input} type="text" placeholder="Email" ></input>
        
        <input style={input} type="text" placeholder="Address" ></input>

        <input style={input} type="text" placeholder="Phone Number" ></input>
        
        <div style={{display: 'flex', alignItems:'center'}}>
            Admin 
            <input type="checkbox"></input>
        </div>
        
        <button style={button} type="button">Create</button>

      </div>
    );
  }
}

export default NewUser;
const  main = {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Impact',
    borderRadius: 5,
    minHeight: 400,
    fontSize: 30,
    padding: 30,
    boxShadow: '0px 0px 30px rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(244,244,244,0.7)',
    marginTop: '10%',
    // width: 200,
}

const input = {
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 5
}

const button = {
    height: 50,
    width: '100%',
    fontSize: 20,
    borderRadius: 5,
    fontFamily: 'inherit',
    // padding: '0px 10px',
    // boxShadow: '0px 5px 5px rgba(0,0,0,0.5)',

}