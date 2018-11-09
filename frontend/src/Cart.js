import React, { Component } from 'react'
import Navbar from './Navbar'
import { apiCall, GET, POST } from './ApiCall'
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

    apiCall('/cart', {isAdmin}, {id})
      .then(res => res.json())
      .then( json => {
        console.log('res', json)
        this.setState({logs: json.results})
    })
  }

      // Call Controller when user clicks on save button
      handleClickSave() {
        const isAdmin = cookie.load('admin') === 'yes' ?  true : false
        const id = cookie.load('id')
        alert("saving...");
        POST('/saveCart', {is_Admin:isAdmin,id:id})
          .then(res => res.json())
          .then( json => {
            console.log(json.results)
            this.setState({logs: []})
        })
      }

  render() {
    const {logs} = this.state
    
    return (
      <div style={main}>
        <Navbar/>
        <div style={body}>
          <h2>Cart</h2>
          <hint>The following data will be modified:</hint>
            <div>
              {logs.map(item =><CartItem resource_data={item.resource} operation={item.operation} index={item.index} />)}  
            </div>
          <button style={savebtn} type="button" onClick={() => this.handleClickSave()}> Save </ button>
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

const savebtn = {
  borderRadius: 5,
  fontFamily: 'inherit',
  padding: '5px 40px',
  margin: 10,
  boxShadow: '0px 5px 5px rgba(0,0,0,0.5)',
}