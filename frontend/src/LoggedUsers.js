import React, { Component } from 'react'
import Navbar from './Navbar'
import { apiCall } from './ApiCall'
import cookie from 'react-cookies'

class LoggedUsers extends Component {
  constructor(){
    super()

    this.state = {
      logs: []
    }
  }

  componentDidMount(){
    const isAdmin = cookie.load('admin') === 'yes' ?  true : false

    apiCall('/loggedusers', {isAdmin})
      .then(res => res.json())
      .then( json => {
        this.setState({logs: json.results})
      })
  }

  render() {
    const {logs} = this.state
    return (
      <div style={main}>
        <Navbar/>
        <div style={body}>
          Logged Users
          <div style={logStyle}>
            {logs.map( ({user, isAdmin}) => (<p style={isAdmin ? {color: 'black', textShadow: 'none'} : null}> {user} {isAdmin ? 'Admin' : 'Not Admin'}</p>) )}
          </div>
        </div>
        
      </div>
    );
  }
}

export default LoggedUsers;
const  main = {
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Impact',
      borderRadius: 5,
      // height: 900,
      width: '100%',
}

const body = {
  height: '100%',
  width: '100%',
  display:'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: '10%',
}

const logStyle ={
  color: 'white',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  fontSize: 20,
  textShadow: '0px 0px 2px black',

}