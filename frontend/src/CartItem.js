import React, { Component } from 'react';
import {PUT, DELETE} from './ApiCall';
import cookie from 'react-cookies'

const bookPic = "http://pngimg.com/uploads/book/book_PNG51061.png"
const magPic = "http://icons.iconarchive.com/icons/icons8/windows-8/256/Printing-Magazine-icon.png"
const movPic = "https://melbournechapter.net/images/film-clipart-png-5.png"
const musicPic = "http://pngimg.com/uploads/headphones/headphones_PNG7645.png"
const defPic = "https://banner2.kisspng.com/20171218/ddc/question-mark-png-5a381257a89243.6425987715136241516905.jpg"
const delPic = "https://melbournechapter.net/images/vector-delete-4.png"
const editPic = "http://www.worldatlaspro.com/images/icon-edit.png"

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
        const {type, resource_data, operation, index } = this.props
        const { editing } = this.state
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