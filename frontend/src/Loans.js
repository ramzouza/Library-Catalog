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
      resourceTitle: "",
      userID: "",
      userEmail: "",
      resourceID: "",
      timestamp: ""
      }
  }

  componentDidMount() {
    this.refresh();
  }

  refresh() {
    const id = cookie.load('id');
    console.log("id", id);
    apiCall('/loans', { id })
      .then(res => res.json())
      .then(json => {
        console.log(1, json);
        this.setState({ loans: json.results })
      })
  }


  render() {
    const { loans } = this.state
    let jsx = loans.map((loan) => <Loan refresh={ _ => this.refresh() } loan={loan} />);
    return (

      <div class="logged-main">
        <Navbar />
        <div class="logged-body">
          <h1>Loaned Items</h1>
          <button class="btn btn-success action-bar-btn" onClick={_ => this.refresh()}><i class="fas fa-sync-alt"></i></button>

          <table class="table table-dark transaction-table">
            <thead>

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