import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import Navbar from './Navbar'





class CreateResource extends Component {

  handleClick(route){
      this.props.history.push(route)
  }

  render() {
    const admin = cookie.load('admin') === 'yes'
    return (
      <div>
      <div class='resource'>
      <Navbar/>
      </div>
      
      <div class='resourcepadding'>
      <div class="create-resource" >
   
        Create a resource
        <button  onClick={() => this.handleClick('/create/book')} type="button">Book<i class="fas fa-book"></i></button>
        <button  onClick={() => this.handleClick('/create/magazine')} type="button">Magazine<i class="fas fa-book-reader"></i></button>
        <button  onClick={() => this.handleClick('/create/movie')} type="button">Movie <i class="fas fa-film"></i></button>
        <button  onClick={() => this.handleClick('/create/music')} type="button">Music <i class="fas fa-music"></i></button>
        
        {!admin ? <Redirect to="/"/> : null}

      </div>
      </div>
      </div>
    );
  }
}

export default CreateResource;
