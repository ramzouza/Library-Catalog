import React, { Component } from 'react'
import Navbar from './Navbar'
import { apiCall } from './ApiCall'
import cookie from 'react-cookies'
import CartItem from './CartItem'

class Cart extends Component {
  constructor(){
    super()

    this.state = {
      logs: []
    }
  }

  componentDidMount(){
    const isAdmin = cookie.load('admin') === 'yes' ?  true : false
    const id = cookie.load('id')

    console.log(id)
    apiCall('/cart', {isAdmin}, {id})
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
          <h2>View Cart</h2>
          <div>
            {logs.map(item =><CartItem key={item.resource.id} id={item.resource.id} type={item.resource.resource_type} resource_data={item.resource} />)}
          </div>
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
    'padding-top': '10%',
    minWidth: '30%',
    display:'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center'
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