import React, { Component } from 'react';
import Navbar from './Navbar';

class LoggedUsers extends Component {
  constructor(){
    super()

    this.state = {
      logs: ['']
    }
  }

  render() {
    const {show} = this.props
    return (
      <div style={main(show)}>
        <Navbar/>
        <div style={body}>
          mlsmflkmsd
        </div>
        
      </div>
    );
  }
}

export default LoggedUsers;
const  main = (show)=> {
  return {
      display:'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontFamily: 'Impact',
      borderRadius: 5,
      // height: 900,
      width: '100%',
  }
}

const body = {
  height: '100%',
  width: '100%',
  display:'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: '10%',
}
