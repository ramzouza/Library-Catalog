import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Navbar extends Component {
  render() {
    return (
      <div style={main} >
        <div></div>
        <div style={{fontSize: 20,display:'flex',flexDirection: 'row',justifyContent: 'space-between',}}>
          
          <Link to="/newuser" style={{textDecoration: 'none', color:'white' }}>
            <div style={{padding: 15}}>Create User</div>
          </Link>

          <Link to="/login" style={{textDecoration: 'none', color:'white' }}>
            <div style={{padding: 15}}>Log out</div>
          </Link>

          <Link to="/loggedusers" style={{textDecoration: 'none', color:'white' }}>
            <div style={{padding: 15}}>Logged Users</div>
          </Link>

        </div>
      </div>
    );
  }
}

export default Navbar;
const  main = {
    position: 'absolute',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Impact',
    width:'100%',
    height: 80,
    fontSize: 25,
    padding: '0px 15px',
    color: 'white',
    boxShadow: '5px 2px 10px rgba(0,0,0,0.5)',
    backgroundColor: 'rgba(0,0,0,0.5)'
}
