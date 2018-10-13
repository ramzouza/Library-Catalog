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
      <div style={main} >
        Create a resource
        <button style={button} onClick={() => this.handleClick('/create/book')} type="button">Book <img style={logo} alt="illustration" src={bookPic}/> </button>
        <button style={button} onClick={() => this.handleClick('/create/magazine')} type="button">Magazine <img style={logo} alt="illustration" src={magPic}/> </button>
        <button style={button} onClick={() => this.handleClick('/create/movie')} type="button">Movie <img style={logo} alt="illustration" src={movPic}/></button>
        <button style={button} onClick={() => this.handleClick('/create/music')} type="button">Music <img style={logo} alt="illustration" src={musicPic}/></button>
        
        {!admin ? <Redirect to="/"/> : null}
      </div>
    );
  }
}

export default CreateResource;
const  main = {
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    fontFamily: 'Impact',
    width: 350,
    borderRadius: 5,
    minHeight: 400,
    fontSize: 30,
    padding: 30,
    boxShadow: '0px 0px 30px rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(244,244,244,0.7)',
    marginTop: '6%',
}

const button = {
    height: 150,
    width: 150,
    fontSize: 25,
    borderRadius: 5,
    fontFamily: 'inherit',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10
}

const logo = {
    height: 35,
    width: 35
}