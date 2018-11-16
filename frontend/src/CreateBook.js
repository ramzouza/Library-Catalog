import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {apiCall} from './ApiCall';
import cookie from 'react-cookies'

class CreateBook extends Component {
  constructor(){
    super()


    this.state = {title: "",
      author: "",
      format: "",
      pages: 0,
      publisher: "",
      language: "",
      ISBN_10: "",
      ISBN_13: ""} 
  }

  handleClick(e){
    const {title,
      author,
      format,
      pages,
      publisher,
      language,
      ISBN_10,
      ISBN_13}  = this.state
    
      const newBook = {title,
        author,
        format,
        pages,
        publisher,
        language,
        ISBN_10,
        ISBN_13}


        console.log(newBook)


        apiCall('/resources', {"resource_data": newBook,"type":"Book"})
        .then( res => res.json() )
        .then ( json => {
          if(json.status === 0){
            this.props.history.push('/')
          }

        })
      
  }
  render() {
    const admin = cookie.load('admin') === 'yes'
    return (
      <div class="create-main" >
        <span style={{fontWeight: 'bold'}} >New Book</span>
        
        <input onChange={evt => {this.setState({title: evt.target.value})}}  type="text" placeholder="Title" ></input>

        <input onChange={evt => {this.setState({author: evt.target.value})}}  type="text" placeholder="Author" ></input>
        
        <input onChange={evt => {this.setState({format: evt.target.value})}}  type="text" placeholder="Format" ></input>
        
        <input onChange={evt => {this.setState({pages: evt.target.value})}}  type="text" placeholder="Pages" ></input>
        
        <input onChange={evt => {this.setState({publisher: evt.target.value})}}  type="text" placeholder="Publisher" ></input>

        <input onChange={evt => {this.setState({language: evt.target.value})}}  type="text" placeholder="Language" ></input>

        <input onChange={evt => {this.setState({ISBN_10: evt.target.value})}}  type="text" placeholder="ISBN 10" ></input>

        <input onChange={evt => {this.setState({ISBN_13: evt.target.value})}}  type="text" placeholder="ISBN 13" ></input>
                
        <button
           onClick={this.handleClick.bind(this)} type="button">Create</button>
        {!admin ? <Redirect to="/"/> : null}
      </div>
    );
  }
}

export default CreateBook;