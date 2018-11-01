import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import {apiCall} from './ApiCall';
import cookie from 'react-cookies'

class CreateMovie extends Component {
  constructor(){
    super()


    this.state = {title: "",
      director: "",
      producers: "",
      actors: "",
      language: "",
      subtitles: "",
      dubbed: "",
      release_date: "",
      run_time: ""} 
  }

  handleClick(e){
    const {title,
      director,
      producers,
      actors,
      language,
      subtitles,
      dubbed,
      release_date,
      run_time}  = this.state
    
      const newMovie = {title,
        director,
        producers,
        actors,
        language,
        subtitles,
        dubbed,
        release_date,
        run_time
      }


      apiCall('/resources', {"resource_data": newMovie,"type":"Movie"})
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
        <span style={{fontWeight: 'bold'}} >New Movie</span>
        
        <input onChange={evt => {this.setState({title: evt.target.value})}} style={input} type="text" placeholder="Title" ></input>

        <input onChange={evt => {this.setState({director: evt.target.value})}} style={input} type="text" placeholder="Director" ></input>
        
        <input onChange={evt => {this.setState({producers: evt.target.value})}} style={input} type="text" placeholder="Producers" ></input>
        
        <input onChange={evt => {this.setState({actors: evt.target.value})}} style={input} type="text" placeholder="Actors" ></input>
        
        <input onChange={evt => {this.setState({language: evt.target.value})}} style={input} type="text" placeholder="Language" ></input>

        <input onChange={evt => {this.setState({subtitles: evt.target.value})}} style={input} type="text" placeholder="Subtitles" ></input>

        <input onChange={evt => {this.setState({dubbed: evt.target.value})}} style={input} type="text" placeholder="Dubbed" ></input>

         Release Date 
        <input onChange={evt => {this.setState({release_date: evt.target.value})}} style={input} type="text" placeholder="DD/MM/YYYY" ></input>
                
        <input onChange={evt => {this.setState({run_time: evt.target.value})}} style={input} type="text" placeholder="Run Time" ></input>
                
        <button style={button}
           onClick={this.handleClick.bind(this)} type="button">Create</button>
        {!admin ? <Redirect to="/"/> : null}
      </div>
    );
  }
}

export default CreateMovie;
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