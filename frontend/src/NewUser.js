import React, { Component } from 'react'
import { apiCall } from './ApiCall'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import Navbar from './Navbar'


class NewUser extends Component {
  constructor(){
    super()


    this.state = {password: "",
      isActive: 0,
      firstName: "",
      lastName: "",
      physicalAddress: "",
      email: "",
      phoneNumber: "", isAdmin: 0} 
  }

  handleClick(e){
    const {password,
      isActive,
      firstName,
      lastName,
      physicalAddress,
      email,
      phoneNumber, isAdmin} = this.state
    
      const newUser = {password,
        isActive,
        firstName,
        lastName,
        physicalAddress,
        email,
        phoneNumber, isAdmin}


        apiCall('/createnewuser', newUser)
        .then( res => res.json() )
        .then (json => {

          if(json.status === 0){
            this.props.history.push('/')
          }

        })
      
  }
  render() {
  const admin = cookie.load('admin') === 'yes'
    return (<div>
      <Navbar/>
      <div class="newuser-main" >
      
        <h1 id="text">Create User</h1>
        
        <input onChange={evt => {this.setState({firstName: evt.target.value})}} type="text" placeholder="First Name" ></input>

        <input onChange={evt => {this.setState({lastName: evt.target.value})}} type="text" placeholder="Last Name" ></input>
        
        <input onChange={evt => {this.setState({password: evt.target.value})}} type="password" placeholder="Password" ></input>
        
        <input onChange={evt => {this.setState({email: evt.target.value})}} type="text" placeholder="Email" ></input>
        
        <input onChange={evt => {this.setState({address: evt.target.value})}} type="text" placeholder="Address" ></input>

        <input onChange={evt => {this.setState({phoneNumber: evt.target.value})}} type="text" placeholder="Phone Number" ></input>
        
        
            <label><input id="checkbox" onChange={evt => {this.setState({isAdmin: evt.target.value? 1 : 0})}} type="checkbox"/> Admin</label>

        
        <button 
           onClick={this.handleClick.bind(this)} type="button"><span>Create</span></button>
        {!admin ? <Redirect to="/"/> : null}
      </div>
      </div>
    );
  }
}

export default NewUser;
