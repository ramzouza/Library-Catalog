import React, { Component } from 'react';

import {Link} from 'react-router-dom'
class Login extends Component {
  render() {
    return (
      <div style={main} >
        <span style={{fontWeight: 'bold'}} >Login</span>
        
        <input style={input} type="text" placeholder="Username" ></input>
        
        <input style={input} type="text" placeholder="Password" ></input>
        
        <span style={{width:'100%', padding: '0px 40px', textAlign: 'right', fontSize: 15}}>
            Password Forgot ?
        </span>

        <Link to="/" style={{ width: '100%',textDecoration: 'none' }}>
          <button style={button} type="button">
            Login
          </button>
        </Link>

      </div>
    );
  }
}

export default Login;
const  main = {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Impact',
    borderRadius: 5,
    height: 300,
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
    fontFamily: 'inherit',
    padding: 10,
    borderRadius: 5,
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