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
    this.refresh();
  }

  refresh(){
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
      <div class= "logged-main">
      <Navbar/>
      <div class= "logged-body">
          <table class="table table-dark transaction-table">
          <thead>
            <tr>
              <th>id</th>
              <th>Last Login</th>
              <th>User Type</th>
            </tr>
          </thead>
            {logs.map( ({user}) => 
            <tr>
              <th>{user.id}</th>
              <th>{user.last_login}</th>
              <th>{user.isAdmin ? "Admin" : "Client"}</th>
              
            </tr> )}
            </table>
            <button class="btn btn-success" onClick={ _ => this.refresh()}><i class="fas fa-sync-alt"></i></button>

    </div>
    </div>
    );
  }
}

export default LoggedUsers;