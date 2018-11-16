import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import Navbar from './Navbar'



const bookPic = "http://pngimg.com/uploads/book/book_PNG51061.png"
const magPic = "http://icons.iconarchive.com/icons/icons8/windows-8/256/Printing-Magazine-icon.png"
const movPic = "https://melbournechapter.net/images/film-clipart-png-5.png"
const musicPic = "http://pngimg.com/uploads/headphones/headphones_PNG7645.png"

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
   
        Create resource
        <button  onClick={() => this.handleClick('/create/book')} type="button">Book</button>
        <button  onClick={() => this.handleClick('/create/magazine')} type="button">Magazine</button>
        <button  onClick={() => this.handleClick('/create/movie')} type="button">Movie</button>
        <button  onClick={() => this.handleClick('/create/music')} type="button">Music</button>
        
        {!admin ? <Redirect to="/"/> : null}

      </div>
      </div>
      </div>
    );
  }
}

export default CreateResource;
