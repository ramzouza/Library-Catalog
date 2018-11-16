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
      <div class="loggedusers-main">
        <Navbar/>
        <div class="loggedusers-body">
          <p>Logged Users</p>
          <div class="loggedusers-style">
            {logs.map( ({user, isAdmin}) => <p><span></span> {user}  ({isAdmin})</p> )}
          </div>
        </div>
        
      </div>
    );
  }
}

export default LoggedUsers;