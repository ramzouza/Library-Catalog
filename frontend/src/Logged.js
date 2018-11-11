import React, { Component } from 'react';
import Navbar from './Navbar';
import Search from './Search';
import Resources from './Resources';
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies'

class Logged extends Component {
  constructor(){
    super()

    this.state = {
      showUsers: false
    }
  }


  render() {
    const logged = cookie.load('logged') === 'yes'
    console.log(logged)
    return (
      <div class= "logged-main">
        <Navbar/>
        <div class= "logged-body">
            <Search/>
        </div>
        {!logged ? <Redirect to="/login"/> : null}
      </div>
    );
  }
}

export default Logged;