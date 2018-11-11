import React, { Component } from 'react'
import { apiCall } from './ApiCall'

import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

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


        console.log(newUser)


        apiCall('/createnewuser', newUser)
        .then( res => res.json() )
        .then (json => {
          alert(json.message)

          if(json.status === 0){
            this.props.history.push('/')
          }

        })
      
  }
  render() {
  const admin = cookie.load('admin') === 'yes'
    return (
      <div class="newuser-main" >
        <span style={{fontWeight: 'bold'}} >New User</span>
        
        <input onChange={evt => {this.setState({firstName: evt.target.value})}} type="text" placeholder="First Name" ></input>

        <input onChange={evt => {this.setState({lastName: evt.target.value})}} type="text" placeholder="Last Name" ></input>
        
        <input onChange={evt => {this.setState({password: evt.target.value})}} type="password" placeholder="Password" ></input>
        
        <input onChange={evt => {this.setState({email: evt.target.value})}} type="text" placeholder="Email" ></input>
        
        <input onChange={evt => {this.setState({address: evt.target.value})}} type="text" placeholder="Address" ></input>

        <input onChange={evt => {this.setState({phoneNumber: evt.target.value})}} type="text" placeholder="Phone Number" ></input>
        
        <div style={{display: 'flex', alignItems:'center'}}>
            Admin 
            <input onChange={evt => {this.setState({isAdmin: evt.target.value? 1 : 0})}} type="checkbox"></input>
        </div>
        
        <button class="newuser-btn"
           onClick={this.handleClick.bind(this)} type="button">Create</button>
        {!admin ? <Redirect to="/"/> : null}
      </div>
    );
  }
}

export default NewUser;
