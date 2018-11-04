import React, { Component } from 'react'
import Navbar from './Navbar'
import { apiCall } from './ApiCall'
import cookie from 'react-cookies'

class Cart extends Component {
  constructor(){
    super()

    this.state = {
      logs: []
    }
  }
  render() {
    const {logs} = this.state
    return (
      <div style={main}>
        <Navbar/>
        <div style={body}>
          <p>View Cart</p>
        </div>
        
      </div>
    );
  }
}

export default Cart;

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