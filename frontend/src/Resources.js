import React, { Component } from 'react';
import {GET} from './ApiCall';
import ResourceItem from './ResourceItem'
class Resources extends Component {

  constructor(){
    super()

    this.state = {
      resource_list: []
    }
  }

  componentDidMount(){
    
    GET('/resources')
      .then(res => res.json())
      .then( json => {
        for (let i=0; i < json.results.length ; i++){
          if (json.results[i] == null){
            delete json.results[i];
          }
        }
        console.log("===== HQ DATABASE ======");
        console.log(json.results);
        console.log("======================");
        this.setState({resource_list: json.results})
      })
  }


  render() {
    const {resource_list} = this.state;
    console.log(resource_list);
    return (
      <div style={main}>
        <h1>High Quality Database</h1>
        {resource_list.map( ({id, title, type}) => <ResourceItem key={id} id={id} title={title} type={type} />)}
      </div>
    );
  }
}

export default Resources;
const  main = {
    minWidth: '30%',
    display:'flex',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent: 'center'
    
}
