import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {apiCall} from './ApiCall';
import cookie from 'react-cookies'

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


        alert(JSON.stringify(newMusic))

        apiCall('/resources', {"resource_data": newMusic,"type":"Music"})
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
      <div style={main} >
        <span style={{fontWeight: 'bold'}} >New Music</span>

        <input onChange={evt => {this.setState({title: evt.target.value})}} style={input} type="text" placeholder="Title" ></input>

        <input onChange={evt => {this.setState({type: evt.target.value})}} style={input} type="text" placeholder="Type" ></input>
        
        <input onChange={evt => {this.setState({artist: evt.target.value})}} style={input} type="text" placeholder="Artist" ></input>
        
        <input onChange={evt => {this.setState({label: evt.target.value})}} style={input} type="text" placeholder="Label" ></input>
        Release Date 
        <input onChange={evt => {this.setState({release_date: evt.target.value})}} style={input} type="text" placeholder="DD/MM/YYYY" ></input>

         <input onChange={evt => {this.setState({ASIN: evt.target.value})}} style={input} type="text" placeholder="ASIN" ></input>
        
        
        <button style={button}
           onClick={this.handleClick.bind(this)} type="button">Create</button>
        {!admin ? <Redirect to="/"/> : null}
      </div>
    );
  }
}

export default CreateMusic;
const  main = {
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Impact',
    borderRadius: 5,
    minHeight: 400,
    fontSize: 30,
    padding: 30,
    boxShadow: '0px 0px 30px rgba(0,0,0,0.1)',
    backgroundColor: 'rgba(244,244,244,0.7)',
    marginTop: '5%',
    // width: 200,
}

const input = {
    fontSize: 30,
    textAlign: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 5
}

const button = {
    height: 50,
    width: '100%',
    fontSize: 20,
    borderRadius: 5,
    fontFamily: 'inherit',
    // padding: '0px 10px',
    // boxShadow: '0px 5px 5px rgba(0,0,0,0.5)',

}