import React, { Component } from 'react';
import Navbar from './Navbar';
import Search from './Search';
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
    const logged = cookie.load('logged') == 'yes'
    console.log(logged)
    return (
      <div style={main} >
        <Navbar/>
        <div style={body}>
            <Search/>
        </div>
        {!logged ? <Redirect to="/login"/> : null}
      </div>
    );
  }
}

export default Logged;
const  main = {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Impact',
    borderRadius: 5,
    height: 900,
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