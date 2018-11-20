import React, { Component } from 'react'
import Navbar from './Navbar'
import { apiCall } from './ApiCall'
import cookie from 'react-cookies'
import Loan from './Loan.js'


class Loans extends Component {
  constructor() {
    super()

    this.state = {
      loans: [],
      filter: [],
      user_id: "",
      user_email: "",
      resource_id: "",
      date_due: "",
      title: "",
      id: ""
      }
  }


  componentDidMount() {
    this.refresh();
  }

  refresh() {
    const id = cookie.load('id');
    apiCall('/loans', { id })
      .then(res => res.json())
      .then(json => {
        this.setState({ loans: json.results, filter: json.results })
      })
  }

  filter(){
    let loan;
    let filter = [];
    this.setState({filter: filter});
    for (let i=0; i<this.state.loans.length; i++){
      loan = this.state.loans[i];
      if (
              loan.userData.results.id.toString().includes(this.state.user_id) &&
              loan.resource_id.toString().includes(this.state.resource_id) &&
              loan.userData.results.email.includes(this.state.user_email) &&
              loan.title.includes(this.state.title) &&
              loan.date_due.includes(this.state.date_due)
      ){

        filter.push(loan);
      }
    }
    this.setState({filter: filter});
  }
  

  handleId(event){
    this.setState({id: event.target.value})
  }
  handleTitle(event){
    this.setState({title: event.target.value})
  }
  handleUserEmail(event){
    this.setState({user_email: event.target.value})
  }
  handleUserId(event){
    this.setState({user_id: event.target.value})
  }
  handleResourceId(event){
    this.setState({resource_id: event.target.value})
  }
  handleDueDate(event){
    this.setState({date_due: event.target.value})
  }

  _handleKeyPress(e) {
    this.filter();
}

  render() {
    const { loans, filter } = this.state
    let jsx = filter.map((loan) => <Loan refresh={ _ => this.refresh() } loan={loan} />);
    return (

      <div class="logged-main">
        <Navbar />
        <div class="logged-body">
          <h1>Loaned Items</h1>
          <button class="btn btn-success action-bar-btn" onClick={_ => this.refresh()}><i class="fas fa-sync-alt"></i></button>

          <table class="table table-dark transaction-table">
            <thead>

              <tr>
                        <td></td>
                        <td><input class="form-control" type="text" onKeyUp={this._handleKeyPress.bind(this)} onChange={this.handleTitle.bind(this)}></input></td>
                        <td><input class="form-control" type="text" onKeyUp={this._handleKeyPress.bind(this)} onChange={this.handleUserEmail.bind(this)}></input></td>
                        <td><input class="form-control" type="text" onKeyUp={this._handleKeyPress.bind(this)} onChange={this.handleUserId.bind(this)}></input></td>
                        <td><input class="form-control" type="text" onKeyUp={this._handleKeyPress.bind(this)} onChange={this.handleResourceId.bind(this)}></input></td>
                        <td><input class="form-control" type="text" onKeyUp={this._handleKeyPress.bind(this)} onChange={this.handleDueDate.bind(this)}></input></td>
                        <td></td>
              </tr>

              <tr>
                <th>Id</th>
                <th>Title</th>
                <th>User Email</th>
                <th>User Id</th>
                <th>Resource Id</th>
                <th>Due Date</th>
              </tr>

            </thead>
            <tbody>
              {jsx}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
}

export default Loans;