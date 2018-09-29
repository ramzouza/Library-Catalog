import React, { Component } from 'react';
import fetch from 'node-fetch'
import cookie from 'react-cookies'

const API = 'http://localhost:3000'

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password:'',
    }
  }

  render() {
    return (
      <div style={main} >
        <span style={{fontWeight: 'bold'}} >Login</span>
        
        <input onChange={evt => {this.setState({email: evt.target.value})}} style={input} type="text"  placeholder="Email" ></input>
        
        <input onChange={evt => {this.setState({password: evt.target.value})}} style={input} type="text"  placeholder="Password" ></input>
        
        <span style={{width:'100%', padding: '0px 40px', textAlign: 'right', fontSize: 15}}>
            Password Forgot ?
        </span>

          <button style={button} type="button" onClick={ _ => {
            const {email, password} = this.state
            fetch(API+'/login', {headers: { 'Content-Type': 'application/json' },method: 'POST', body: JSON.stringify({email, password})})
              .then(response => response.json())
              .then( response => {
                alert(response.message)
                console.log(response)
                if(response.status === 0){
                  // const admin = response.result.isAdmin
                  cookie.save('logged', 'yes')
                  // cookie.save('isadmin', 'yes')
                  this.props.history.push('/')
                }
              })
          }} >
            Login
          </button>

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