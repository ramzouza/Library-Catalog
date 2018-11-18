import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {apiCall} from './ApiCall';
import cookie from 'react-cookies'
import Navbar from './Navbar'


class CreateMusic extends Component {
  constructor(){
    super()


    this.state = {
        title: "",
        type: "",
        artist: "",
        label: "",
        ASIN: "",
        release_date:""
      } 
  }

  handleClick(e){
    const {title,
        type,
        artist,
        label,
        ASIN,
        release_date
        } = this.state
    
      const newMusic = {
        title,
        type,
        artist,
        label,
        ASIN,
        release_date}



        apiCall('/resources', {"resource_data": newMusic,"type":"Music"})
        .then( res => res.json() )
        .then ( json => {

          if(json.status === 0){
            this.props.history.push('/cart')
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

        <input onChange={evt => {this.setState({type: evt.target.value})}}  type="text" placeholder="Type" ></input>
        
        <input onChange={evt => {this.setState({artist: evt.target.value})}}  type="text" placeholder="Artist" ></input>
        
        <input onChange={evt => {this.setState({label: evt.target.value})}}  type="text" placeholder="Label" ></input>
        <input onChange={evt => {this.setState({release_date: evt.target.value})}}  type="text" placeholder="DD/MM/YYYY" ></input>

         <input onChange={evt => {this.setState({ASIN: evt.target.value})}}  type="text" placeholder="ASIN" ></input>
        
        
        <button
           onClick={this.handleClick.bind(this)} type="button"><span>Create Music</span></button>
        {!admin ? <Redirect to="/cart"/> : null}
        </div>
      </div>
      </div>
    );
  }
}

export default CreateMusic;
