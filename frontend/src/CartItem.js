import React, { Component } from 'react';
import {DELETE} from './ApiCall';
import cookie from 'react-cookies'

class CartItem extends Component {

    constructor(){
        super()

        this.state = {
            editing: false,
            title: ''
        }
    }

    typeToSchma(type){
        let jsx = <h1></h1>;
        switch (type) {
            case "book":
                jsx = <div>

                </div>
                return jsx;
            case "magazine":
                return jsx;
            case "movie":
                return jsx;
            case "music":
                return jsx;
            default: 
                return jsx;
        } 
    }

    handleClickRemove(index){
        DELETE('/cartItem', {"index": index})
        .then( res => res.json() )
        .then ( json => {
          alert(json.message)
          window.location.reload()
        })
            
    }

    render() {
        const {resource_data, operation, index } = this.props
        const admin = cookie.load('admin') === 'yes';

        return (
            <div style={main}>
                    <span style={{ marginLeft: 10,fontFamily: 'Arial'}}> <strong>Operation:</strong> {operation}</span> <br />
                    <span style={{ marginLeft: 10,fontFamily: 'Arial'}}>  Title: {resource_data.title}</span> <br />
                    <span style={{ marginLeft: 10,fontFamily: 'Arial'}}>  Information: {JSON.stringify(resource_data)}</span><br />
                    <button style={button} type="button" onClick={() => this.handleClickRemove(index)}> Remove </ button>
            </div>
        );
    }

}

export default CartItem;

const main = {
    width: '100%',
    borderBottom: '1px solid black',
    backgroundColor: 'white',
    padding: "5px"
}

const button = {
    borderRadius: 5,
    fontFamily: 'inherit',
    padding: '5px 40px',
    margin: 10,
    boxShadow: '0px 5px 5px rgba(0,0,0,0.5)',
  }