import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { apiCall } from './ApiCall';
import cookie from 'react-cookies'
import Navbar from './Navbar'
import swal from 'sweetalert2'


class CreateMovie extends Component {
  constructor() {
    super()


    this.state = {
      title: "",
      director: "",
      producers: "",
      actors: "",
      language: "",
      subtitles: "",
      dubbed: "",
      release_date: "",
      run_time: ""
    }
  }

  handleClick(e) {
    const { title,
      director,
      producers,
      actors,
      language,
      subtitles,
      dubbed,
      release_date,
      run_time } = this.state

    const newMovie = {
      title,
      director,
      producers,
      actors,
      language,
      subtitles,
      dubbed,
      release_date,
      run_time
    }


    apiCall('/resources', { "resource_data": newMovie, "type": "Movie" })
      .then(res => res.json())
      .then(json => {

        if (json.status === 0) {
          swal({
            title: 'Created!',
            text: "A new Movie has been added to the cart!",
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
          <div class="create-main">


            <input onChange={evt => { this.setState({ title: evt.target.value }) }} type="text" placeholder="Title" ></input>

            <input onChange={evt => { this.setState({ director: evt.target.value }) }} type="text" placeholder="Director" ></input>

            <input onChange={evt => { this.setState({ producers: evt.target.value }) }} type="text" placeholder="Producers" ></input>

            <input onChange={evt => { this.setState({ actors: evt.target.value }) }} type="text" placeholder="Actors" ></input>

            <input onChange={evt => { this.setState({ language: evt.target.value }) }} type="text" placeholder="Language" ></input>

            <input onChange={evt => { this.setState({ subtitles: evt.target.value }) }} type="text" placeholder="Subtitles" ></input>

            <input onChange={evt => { this.setState({ dubbed: evt.target.value }) }} type="text" placeholder="Dubbed" ></input>

            <input onChange={evt => { this.setState({ release_date: evt.target.value }) }} type="text" placeholder="DD/MM/YYYY" ></input>

            <input onChange={evt => { this.setState({ run_time: evt.target.value }) }} type="text" placeholder="Run Time" ></input>

            <button
              onClick={this.handleClick.bind(this)} type="button"><span>Create Movie</span></button>
            {!admin ? <Redirect to="/cart" /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateMovie;