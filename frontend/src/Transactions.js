import React, { Component } from 'react'
import Navbar from './Navbar'
import { apiCall } from './ApiCall'
import cookie from 'react-cookies'
import Transaction from './Transaction.js'
import {Link} from 'react-router-dom'

class Transactions extends Component {
  constructor(){
    super()

    this.state = {
      transactions: []
    }
  }

  componentDidMount(){
    this.refresh();
  }

  refresh(){
    const id = cookie.load('id');

    apiCall('/transactions', {id})
      .then(res => res.json())
      .then( json => {
        console.log(json.results)
        this.setState({transactions: json.results})
      })
  }

  render() {
    const {transactions} = this.state
    console.log(transactions)
    return (
        
      <div class= "logged-main">
      <Navbar/>
      <div class= "logged-body">
      <h1>Transactions</h1>
          <table class="table table-dark transaction-table">
                  <thead>
                    <tr>
                      <th>Transaction Id</th>
                      <th>User Id</th>
                      <th>Resource Id</th>
                      <th>Loan or Return</th>
                      <th>Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map( (transaction) => <Transaction transaction={transaction} /> )}
                  </tbody>
              </table>
              <button class="btn btn-success" onClick={ _ => this.refresh()}><i class="fas fa-sync-alt"></i></button>
      </div>
      </div>
       
    );
  }
}

export default Transactions;