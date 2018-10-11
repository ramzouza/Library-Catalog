import React, { Component } from 'react'
import { apiCall } from './ApiCall'

class CreateMusic extends Component {
  constructor(){
    super()


    this.state = {
        Title: "",
        Type: "",
        Artist: "",
        Label: "",
        ASIN: "",
        Release_date:""
      } 
  }

  handleClick(e){
    const {Title,
        Type,
        Artist,
        Label,
        ASIN,
        Release_date
        } = this.state
    
      const newMusic = {
        Title,
        Type,
        Artist,
        Label,
        ASIN,
        Release_date}


        alert(JSON.stringify(newMusic))

/*
        apiCall('/createnewuser', newUser)
        .then( res => res.json() )
        .then (json => {
          alert(json.message)

          if(json.status === 0){
            this.props.history.push('/')
          }

        })*/
      
  }
  render() {
    return (
      <div style={main} >
        <span style={{fontWeight: 'bold'}} >New Music</span>

        <input onChange={evt => {this.setState({Title: evt.target.value})}} style={input} type="text" placeholder="Title" ></input>

        <input onChange={evt => {this.setState({Type: evt.target.value})}} style={input} type="text" placeholder="Type" ></input>
        
        <input onChange={evt => {this.setState({Artist: evt.target.value})}} style={input} type="text" placeholder="Artist" ></input>
        
        <input onChange={evt => {this.setState({Label: evt.target.value})}} style={input} type="text" placeholder="Label" ></input>
        Release Date 
        <input onChange={evt => {this.setState({Release_date: evt.target.value})}} style={input} type="text" placeholder="DD/MM/YYYY" ></input>

         <input onChange={evt => {this.setState({ASIN: evt.target.value})}} style={input} type="text" placeholder="ASIN" ></input>
        
        
        <button style={button}
           onClick={this.handleClick.bind(this)} type="button">Create</button>

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
    marginTop: '10%',
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