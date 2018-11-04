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

    typeToPicture(type) {
        switch (type) {
            case "book":
                return bookPic
            case "magazine":
                return magPic
            case "movie":
                return movPic
            case "music":
                return musicPic
            default: 
                return defPic
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

    render() {
        const { id, type, resource_data } = this.props
        const { editing } = this.state
        const admin = cookie.load('admin') === 'yes';

        return (
            <div style={main}>
                <div>
                    
                    <img alt="" style={picStyle} src={this.typeToPicture(type)}/>
                    {editing ? <input placeholder={resource_data.title} onChange={e => this.setState({title: e.target.value})}/>
                            :  <a>
                                Title: <a style={{ marginLeft: 10,fontFamily: 'Arial'}}>{resource_data.title}</a><br></br>
                                Data: <a style={{ marginLeft: 10,fontFamily: 'Arial'}}>{JSON.stringify(resource_data)}</a>
                                
                                
                            </a>
                                
                            
                    }
                </div>
            </div>
        );
    }

}

export default CartItem;

const main = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Impact',
    height: 50,
    width: '100%',
    borderBottom: '1px solid black',
    backgroundColor: 'white',
    padding: "0px 5px"
}

const picStyle = {
    height: 20,
    width: 20,
    padding: '0px 10px'
}

const icons = {
    height: 20,
    width: 20,
}