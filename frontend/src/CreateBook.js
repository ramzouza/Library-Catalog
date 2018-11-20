import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { apiCall } from './ApiCall';
import cookie from 'react-cookies'
import Navbar from './Navbar'
import swal from 'sweetalert2'

class CreateBook extends Component {
  constructor() {
    super()


    this.state = {
      title: "",
      author: "",
      format: "",
      pages: 0,
      publisher: "",
      language: "",
      ISBN_10: "",
      ISBN_13: ""
    }
  }

  handleClick(e) {
    const { title,
      author,
      format,
      pages,
      publisher,
      language,
      ISBN_10,
      ISBN_13 } = this.state

    const newBook = {
      title,
      author,
      format,
      pages,
      publisher,
      language,
      ISBN_10,
      ISBN_13
    }


    console.log(newBook)


    apiCall('/resources', { "resource_data": newBook, "type": "Book" })
      .then(res => res.json())
      .then(json => {
        if (json.status === 0) {
          swal({
            title: 'Created!',
            text: "A new Book has been added to the cart!",
            type: 'success',
            confirmButtonColor: '#037d9e',
            confirmButtonText: 'Ok!',
            allowOutsideClick: false

          }).then((result) => {
            if (result.value) {
              this.props.history.push('/')
            }
          })
        }
      })

  }
  render() {
    const admin = cookie.load('admin') === 'yes'
    return (
      <div>

        <Navbar />

        <div class="create-padding">
          <div class="create-main" >
            <input onChange={evt => { this.setState({ title: evt.target.value }) }} type="text" placeholder="Title" ></input>

            <input onChange={evt => { this.setState({ author: evt.target.value }) }} type="text" placeholder="Author" ></input>

            <input onChange={evt => { this.setState({ format: evt.target.value }) }} type="text" placeholder="Format" ></input>

            <input onChange={evt => { this.setState({ pages: evt.target.value }) }} type="text" placeholder="Pages" ></input>

            <input onChange={evt => { this.setState({ publisher: evt.target.value }) }} type="text" placeholder="Publisher" ></input>

            <input onChange={evt => { this.setState({ language: evt.target.value }) }} type="text" placeholder="Language" ></input>

            <input onChange={evt => { this.setState({ ISBN_10: evt.target.value }) }} type="text" placeholder="ISBN 10" ></input>

            <input onChange={evt => { this.setState({ ISBN_13: evt.target.value }) }} type="text" placeholder="ISBN 13" ></input>

            <button
              onClick={this.handleClick.bind(this)} type="button"><span>Create Book</span></button>
            {!admin ? <Redirect to="/cart" /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateBook;