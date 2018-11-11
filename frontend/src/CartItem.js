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
            <div class="cart-item">
                    <span style={{ marginLeft: 10,fontFamily: 'Arial'}}> <strong>Operation:</strong> {operation}</span> <br />
                    <span style={{ marginLeft: 10,fontFamily: 'Arial'}}>  Title: {resource_data.title}</span> <br />
                    <span style={{ marginLeft: 10,fontFamily: 'Arial'}}>  Information: {JSON.stringify(resource_data)}</span><br />
                    <button class="cart-btn" type="button" onClick={() => this.handleClickRemove(index)}> Remove </ button>
            </div>
        );
    }

}

export default CartItem;