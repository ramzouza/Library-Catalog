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
      <div style={main} >
        <span style={{fontWeight: 'bold'}} >New User</span>
        
        <input onChange={evt => {this.setState({firstName: evt.target.value})}} style={input} type="text" placeholder="First Name" ></input>

        <input onChange={evt => {this.setState({lastName: evt.target.value})}} style={input} type="text" placeholder="Last Name" ></input>
        
        <input onChange={evt => {this.setState({password: evt.target.value})}} style={input} type="password" placeholder="Password" ></input>
        
        <input onChange={evt => {this.setState({email: evt.target.value})}} style={input} type="text" placeholder="Email" ></input>
        
        <input onChange={evt => {this.setState({address: evt.target.value})}} style={input} type="text" placeholder="Address" ></input>

        <input onChange={evt => {this.setState({phoneNumber: evt.target.value})}} style={input} type="text" placeholder="Phone Number" ></input>
        
        <div style={{display: 'flex', alignItems:'center'}}>
            Admin 
            <input onChange={evt => {this.setState({isAdmin: evt.target.value? 1 : 0})}} type="checkbox"></input>
        </div>
        
        <button style={button}
           onClick={this.handleClick.bind(this)} type="button">Create</button>
        {!admin ? <Redirect to="/"/> : null}
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