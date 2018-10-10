import React, { Component } from 'react'
import { apiCall } from './ApiCall'

class CreateMagazine extends Component {
  constructor(){
    super()


    this.state = {password: "",
      Publisher: "",
      Language: "",
      ISBN_10: "",
      ISBN_13: "",
      Title: ""} 
  }

  handleClick(e){
    const {Publisher,
        Language,
        ISBN_10,
        ISBN_13,
        Title} = this.state
    
      const newMagazine = {Publisher,
        Language,
        ISBN_10,
        ISBN_13,
        Title}


        alert(JSON.stringify(newMagazine))

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
        <span style={{fontWeight: 'bold'}} >New Magazine</span>

        <input onChange={evt => {this.setState({Title: evt.target.value})}} style={input} type="text" placeholder="Title" ></input>
        
        <input onChange={evt => {this.setState({Publisher: evt.target.value})}} style={input} type="text" placeholder="Publisher" ></input>
        
        <input onChange={evt => {this.setState({Language: evt.target.value})}} style={input} type="text" placeholder="Language" ></input>

        <input onChange={evt => {this.setState({ISBN_10: evt.target.value})}} style={input} type="text" placeholder="ISBN-10" ></input>

         <input onChange={evt => {this.setState({ISBN_13: evt.target.value})}} style={input} type="text" placeholder="ISBN-13" ></input>
        
        
        <button style={button}
           onClick={this.handleClick.bind(this)} type="button">Create</button>

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