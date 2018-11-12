import React, { Component } from 'react'
import Navbar from './Navbar'
import { apiCall, POST } from './ApiCall'
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
      <div class="cart">
        <Navbar/>
        <div class="cart-body">
          <h2>Cart</h2>
          <hint>The following data will be modified:</hint>
            <div>
              {logs.map(item =><CartItem resource_data={item.resource} operation={item.operation} index={item.index} />)}  
            </div>
          <button class="cart-btn" type="button" onClick={() => this.handleClickSave()}> Save </ button>
        </div>
      </div>
    );
  }
}

export default Cart;