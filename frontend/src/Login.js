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
      message:'',
    }
  }

  loginEvent(e){
    const {email, password} = this.state
    apiCall('/login', {email, password})
      .then(response => response.json())
      .then( response => {
        this.setState({message:response.message})

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
    const message = this.state.message;
    return (
      <div class="login-main" >
        <h1>LOGIN</h1>
        
        <input id="email" onChange={evt => {this.setState({email: evt.target.value})}}  type="text"  placeholder="Email" onKeyPress={ ({key}) => key==='Enter'?this.loginEvent():null} />
        
        <input id="password" onChange={evt => {this.setState({password: evt.target.value})}}  type="password"  placeholder="Password" onKeyPress={ ({key}) => key==='Enter'?this.loginEvent():null} />
        
        <button class="button" type="button" onClick={ this.loginEvent.bind(this) }><span>
            SUBMIT
        </span></button>
        
        <p id="wrong">{message}</p>
          {logged ? <Redirect to="/"/> : null}
      </div>
    );
  }
}

export default Login;