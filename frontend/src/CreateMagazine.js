import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {apiCall} from './ApiCall';
import cookie from 'react-cookies'

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


        alert(JSON.stringify(newMagazine))

        apiCall('/resources', {"resource_data": newMagazine,"type":"Magazine"})
        .then( res => res.json() )
        .then ( json => {
          alert(json.message)

          if(json.status === 0){
            this.props.history.push('/')
          }

        })
      
  }
  render() {
    const admin = cookie.load('admin') === 'yes'
    return (
      <div class="create-main">
        <span style={{fontWeight: 'bold'}} >New Magazine</span>

        <input onChange={evt => {this.setState({title: evt.target.value})}}  type="text" placeholder="Title" ></input>
        
        <input onChange={evt => {this.setState({publisher: evt.target.value})}}  type="text" placeholder="Publisher" ></input>
        
        <input onChange={evt => {this.setState({language: evt.target.value})}}  type="text" placeholder="Language" ></input>

        <input onChange={evt => {this.setState({ISBN_10: evt.target.value})}}  type="text" placeholder="ISBN-10" ></input>

         <input onChange={evt => {this.setState({ISBN_13: evt.target.value})}}  type="text" placeholder="ISBN-13" ></input>
        
        
        <button
           onClick={this.handleClick.bind(this)} type="button">Create</button>
        {!admin ? <Redirect to="/"/> : null}
      </div>
    );
  }
}

export default CreateMagazine;
