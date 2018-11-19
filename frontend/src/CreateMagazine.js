import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {apiCall} from './ApiCall';
import cookie from 'react-cookies'
import Navbar from './Navbar'
import swal from 'sweetalert2'

class CreateMagazine extends Component {
  constructor(){
    super()


    this.state = {
      publisher: "",
      language: "",
      ISBN_10: "",
      ISBN_13: "",
      title: ""} 
  }

  handleClick(e){
    const {publisher,
        language,
        ISBN_10,
        ISBN_13,
        title} = this.state
    
      const newMagazine = {publisher,
        language,
        ISBN_10,
        ISBN_13,
        title}



        apiCall('/resources', {"resource_data": newMagazine,"type":"Magazine"})
        .then( res => res.json() )
        .then ( json => {

          if(json.status === 0){
            swal({
              title: 'Created!',
              text: "A new Magazine is created!",
              type: 'success',
              confirmButtonColor: '#037d9e',
              confirmButtonText: 'Ok!',
              allowOutsideClick:false
            
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

      <Navbar/>
        
      <div class="create-padding">
      <div class="create-main">
        

        <input onChange={evt => {this.setState({title: evt.target.value})}}  type="text" placeholder="Title" ></input>
        
        <input onChange={evt => {this.setState({publisher: evt.target.value})}}  type="text" placeholder="Publisher" ></input>
        
        <input onChange={evt => {this.setState({language: evt.target.value})}}  type="text" placeholder="Language" ></input>

        <input onChange={evt => {this.setState({ISBN_10: evt.target.value})}}  type="text" placeholder="ISBN-10" ></input>

         <input onChange={evt => {this.setState({ISBN_13: evt.target.value})}}  type="text" placeholder="ISBN-13" ></input>
        
        
        <button
           onClick={this.handleClick.bind(this)} type="button"><span>Create Magazine</span></button>
        {!admin ? <Redirect to="/cart"/> : null}
      </div>
      </div>
      </div>
    );
  }
}

export default CreateMagazine;
