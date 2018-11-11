import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import cookie from 'react-cookies'

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
      <div class="create-resource" >
        Create a resource
        <button  onClick={() => this.handleClick('/create/book')} type="button">Book <img  alt="illustration" src={bookPic}/> </button>
        <button  onClick={() => this.handleClick('/create/magazine')} type="button">Magazine <img  alt="illustration" src={magPic}/> </button>
        <button  onClick={() => this.handleClick('/create/movie')} type="button">Movie <img  alt="illustration" src={movPic}/></button>
        <button  onClick={() => this.handleClick('/create/music')} type="button">Music <img  alt="illustration" src={musicPic}/></button>
        
        {!admin ? <Redirect to="/"/> : null}
      </div>
    );
  }
}

export default CreateResource;
