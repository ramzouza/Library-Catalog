import React, { Component } from 'react';
import cookie from 'react-cookies'
import { apiCall } from './ApiCall';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  constructor(){
    super()
    this.state = {
      email: '',
      password:'',
    }
  }

  loginEvent(e){
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
      }).catch(e => alert('error, make sure the backend is running'))
  }

  render() {
    const logged = cookie.load('logged') === 'yes'

    return (
      <div class="login-main" >
        <span style={{fontWeight: 'bold'}} >Login</span>
        
        <input onChange={evt => {this.setState({email: evt.target.value})}}  type="text"  placeholder="Email" onKeyPress={ ({key}) => key==='Enter'?this.loginEvent():null} />
        
        <input onChange={evt => {this.setState({password: evt.target.value})}}  type="password"  placeholder="Password" onKeyPress={ ({key}) => key==='Enter'?this.loginEvent():null} />
        
        <span style={{width:'100%', padding: '0px 40px', textAlign: 'right', fontSize: 15}}>
            Password Forgotten?
        </span>

          <button type="button" onClick={ this.loginEvent.bind(this) }>
            Login
          </button>
          {logged ? <Redirect to="/"/> : null}
      </div>
    );
  }
}

export default Login;