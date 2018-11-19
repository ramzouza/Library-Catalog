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
      transactions: [],
      filter: [],
      user_id: "",
      user_email: "",
      resource_id: "",
      transaction_type: "",
      timestamp: ""
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
        this.setState({transactions: json.results, filter: json.results})
      })
  }

  filter(){
    let transaction;
    let filter = [];
    this.setState({filter: filter});
    for (let i=0; i<this.state.transactions.length; i++){
      transaction = this.state.transactions[i];
      if (
              transaction.user_id.toString().includes(this.state.user_id) &&
              transaction.resource_id.toString().includes(this.state.resource_id) &&
              transaction.userData.results.email.includes(this.state.user_email) &&
              transaction.transaction_type.includes(this.state.transaction_type) &&
              transaction.timestamp.includes(this.state.timestamp)
      ){
        filter.push(transaction);
      }
    }
    this.setState({filter: filter});
  }

  handleUserIdChange(event){
    this.setState({user_id: event.target.value})
  }
  handleUserEmailChange(event){
    this.setState({user_email: event.target.value})
  }
  handleResourceIdChange(event){
    this.setState({resource_id: event.target.value})
  }
  handleTransactionChange(event){
    this.setState({transaction_type: event.target.value})
  }
  handleTimestampChange(event){
    this.setState({timestamp: event.target.value})
  }

  _handleKeyPress(e) {
      this.filter();
  }


  render() {
    const {transactions, filter} = this.state
    return (
        
      <div class= "logged-main">
      <Navbar/>
      <div class= "logged-body">
      <h1>Transactions</h1>
      <button class="btn btn-success action-bar-btn" onClick={ _ => this.refresh()}><i class="fas fa-sync-alt"></i></button>
      <button class="btn btn-primary action-bar-btn" onClick={ _ => this.filter()}><i class="fas fa-search"></i></button>

          <table class="table table-dark transaction-table">
                  <thead>
                  <tr>
                        <td></td>
                        <td><input class="form-control" type="text" onKeyUp={this._handleKeyPress.bind(this)} value={this.state.title} onChange={this.handleUserEmailChange.bind(this)}></input></td>
                        <td><input class="form-control" type="text" onKeyUp={this._handleKeyPress.bind(this)} value={this.state.title} onChange={this.handleUserIdChange.bind(this)}></input></td>
                        <td><input class="form-control" type="text" onKeyUp={this._handleKeyPress.bind(this)} value={this.state.title} onChange={this.handleResourceIdChange.bind(this)}></input></td>
                        <td><input class="form-control" type="text" onKeyUp={this._handleKeyPress.bind(this)}  value={this.state.title} onChange={this.handleTransactionChange.bind(this)}></input></td>
                        <td><input class="form-control" type="text" onKeyUp={this._handleKeyPress.bind(this)} value={this.state.title} onChange={this.handleTimestampChange.bind(this)}></input></td>
                  </tr>

                    <tr>
                      <th>Transaction Id</th>
                      <th>User Email</th>
                      <th>User Id</th>
                      <th>Resource Id</th>
                      <th>Loan or Return</th>
                      <th>Timestamp</th>
                    </tr>
                    
                  </thead>
                  <tbody>
                    {filter.map( (transaction) => <Transaction transaction={transaction} /> )}
                  </tbody>
              </table>
      </div>
      </div>
       
    );
  }
}

export default Transactions;