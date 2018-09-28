import React, { Component } from 'react';
import Navbar from './Navbar';
import Search from './Search';

class Logged extends Component {
  constructor(){
    super()

    this.state = {
      showUsers: false
    }
  }


  render() {
    return (
      <div style={main} >
        <Navbar/>
        <div style={body}>
            <Search/>
        </div>
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