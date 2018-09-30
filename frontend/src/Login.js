import React, { Component } from 'react';
import cookie from 'react-cookies'
import { apiCall } from './ApiCall';

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
        
        <input onChange={evt => {this.setState({password: evt.target.value})}} style={input} type="password"  placeholder="Password" ></input>
        
        <span style={{width:'100%', padding: '0px 40px', textAlign: 'right', fontSize: 15}}>
            Password Forgot ?
        </span>

          <button style={button} type="button" onClick={ _ => {
            const {email, password} = this.state
            apiCall('/login', {email, password})
              .then(response => response.json())
              .then( response => {
                alert(response.message)

                if(response.status === 0){
                  
                  const isAdmin = response.results.isAdmin === 1 ? 'yes' : 'no'
                  const id = response.results.id

                  cookie.save('admin', isAdmin)
                  cookie.save('id', id)
                  cookie.save('email', email)
                  cookie.save('logged', 'yes')
                  apiCall('/connect', {id})
                  this.props.history.push('/')
                }

              })
          }}>
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