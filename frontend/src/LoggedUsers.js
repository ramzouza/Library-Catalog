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
    const id = cookie.load('id')

    apiCall('/loggedusers', {isAdmin}, {id})
      .then(res => res.json())
      .then( json => {
        console.log('res', json)
        this.setState({logs: json.results})
      })
  }

  render() {
    const {logs} = this.state
    return (
      <div style={main}>
        <Navbar/>
        <div style={body}>
          <p>Logged Users</p>
          <div style={logStyle}>
            {logs.map( ({user, isAdmin}) => <p style={{fontFamily:'Times',color: 'black', textShadow: 'none'}}><span><img src={require('./LoggedUsers.png')}/></span> {user}  ({isAdmin})</p> )}
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
  fontSize: 25,
}

const logStyle ={
  color: 'white',
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: 20,
  textShadow: '0px 0px 2px black',

}