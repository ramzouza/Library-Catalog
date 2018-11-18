import React, { Component } from 'react'
import Navbar from './Navbar'
import { apiCall, POST } from './ApiCall'
import cookie from 'react-cookies'
import CartItem from './CartItem'

class Cart extends Component {
  constructor(){
    super()

    this.state = {
      logs: [],
      message: "The following data will be modified:"
    }
  }
  componentDidMount(){
  const isAdmin = cookie.load('admin') === 'yes' ?  true : false
  if(isAdmin){  
    apiCall('/cart')
      .then(res => res.json())
      .then( json => {
        console.log('res', json)
        this.setState({logs: json.results})
    })
  }  
  else{
    const cart = cookie.load('userCart') || []
    const wtf = cart.map(x => {return {resource: x, type: x.type, operation: 'Loan'}})
    this.setState({logs: wtf})
  }
  }

      // Call Controller when user clicks on save button
      handleClickSave() {
        const isAdmin = cookie.load('admin') === 'yes' ?  true : false
        if(isAdmin){
          POST('/saveCart')
            .then(res => res.json())
            .then( json => {
              console.log(json.results)
              this.setState({logs: []})
          })
        } else {
          const {logs} = this.state
          console.log({logs})
          const id = cookie.load('id') || []
          const ids = logs.map( x => x.resource).map(x => x.id)
          POST('/loanItem', {item: ids, userId: id})
            .then( res => res.json() )
            .then(res => {
              console.log({res})
              const {status, message, info} = res
              if(status === 0){
                const nonAdded = info.filter( x => x.loan === 0 )
                const nonAddedTitles = nonAdded.map(x => x.itemid)
                                                .map( x => {
                                                  let title = logs.map(y => y.resource).find(y => y.id === x ).title || ""
                                                  return title
                                                })
                                                .join(',')
                console.log({nonAdded,nonAddedTitles})
                if(nonAdded.length > 0) this.setState({message:`Loan complete however, non available resource(s): ${nonAddedTitles}`})
                else {
                  this.setState({message:'Loan complete'}); 
                }
                this.setState({logs: []})
                cookie.remove('userCart')
              }
              // res.filter(res => res)
            })
        }
      }

  render() {
    const {logs} = this.state
    
    return (
      <div class= "logged-main">
      <Navbar/>
      <div class= "logged-body">
          <h1>Cart</h1>
          <h4>The following data will be modified:</h4>
          {logs.map(item =><CartItem resource_data={item.resource} type={item.type} operation={item.operation} index={item.index} />)}  
          {cookie.load('admin') === 'yes'?
            <button class="btn-cart btn btn-success action-bar-btn" type="button" onClick={() => this.handleClickSave()}><i class="fas fa-save"></i> Save</ button>:
<<<<<<< HEAD
            <button class="btn-cart btn btn-success action-bar-btn" type="button"><i class="fas fa-save"></i> Loan</ button> // add handleClickLoan
      } 
=======
            <button class="btn-cart btn btn-success action-bar-btn" type="button" onClick={() => this.handleClickSave()}><i class="fas fa-save"></i> Loan</ button> // add handleClickLoan
          }
          <h4>{this.state.message}</h4>
          {logs.map(item =><CartItem resource_data={item.resource} type={item.type} operation={item.operation} index={item.index} />)}  
>>>>>>> ea33089ffcab0b035bc67071e7c778ee3b2dac81
      </div>
      </div>
      
    );
  }
}

export default Cart;