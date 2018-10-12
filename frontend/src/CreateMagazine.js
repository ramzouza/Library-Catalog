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
      <div style={main} >
        <span style={{fontWeight: 'bold'}} >New Magazine</span>

        <input onChange={evt => {this.setState({title: evt.target.value})}} style={input} type="text" placeholder="Title" ></input>
        
        <input onChange={evt => {this.setState({publisher: evt.target.value})}} style={input} type="text" placeholder="Publisher" ></input>
        
        <input onChange={evt => {this.setState({language: evt.target.value})}} style={input} type="text" placeholder="Language" ></input>

        <input onChange={evt => {this.setState({ISBN_10: evt.target.value})}} style={input} type="text" placeholder="ISBN-10" ></input>

         <input onChange={evt => {this.setState({ISBN_13: evt.target.value})}} style={input} type="text" placeholder="ISBN-13" ></input>
        
        
        <button style={button}
           onClick={this.handleClick.bind(this)} type="button">Create</button>
        {!admin ? <Redirect to="/"/> : null}
      </div>
    );
  }
}

export default CreateMagazine;
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