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
        if(json.results !== undefined){
        for (let i=0; i < json.results.length ; i++){
          if (json.results[i] == null){
            delete json.results[i];
          }
        }
        console.log("===== HQ DATABASE ======");
        console.log(json.results);
        console.log("======================");
        this.setState({resource_list: json.results})}
      })
  }


  render() {
    const {resource_list} = this.state;
    return (
      <div style={main}>
        <h1>High Quality Database</h1>
        {resource_list.map( ({type, resource_data}) => <ResourceItem key={resource_data.id} id={resource_data.id} type={type} resource_data={resource_data} />)}
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
