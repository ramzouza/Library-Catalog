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

    handleClickRemove(index, id){
        const isAdmin = cookie.load("admin") === 'yes'
        if(isAdmin){
            DELETE('/cartItem', {"index": index})
                .then( res => res.json() )
                .then ( json => {
                window.location.reload()
                })
        }else {
            const cart = cookie.load('userCart')
            const newCart = cart.filter(x => x.id !== id)
            cookie.save('userCart', newCart)
            alert('Item removed')
            window.location.reload()
        }
            
    }

    render() {
        const {resource_data, type, operation, index } = this.props
        const resource = resource_data;
        const admin = cookie.load('admin') === 'yes';
        let Jsx;
        if (type == "book"){
            Jsx = <div>
                <p><b> Author: </b>{resource.author}</p>
                <p><b> Format: </b>{resource.format}</p>
                <p><b> Pages: </b>{resource.pages}</p>
                <p><b> Publisher: </b>{resource.publisher}</p>
                <p><b> Language: </b>{resource.language}</p>
                <p><b> ISBN 10: </b>{resource.isbn_10}</p>
                <p><b> ISBN 13: </b>{resource.isbn_13}</p>
            </div>
        } else if (type == "magazine"){
            
            Jsx= <div>
                <p><b> Publisher: </b>{resource.publisher}</p>
                <p><b> Language: </b>{resource.language}</p>
                <p><b> ISBN 10: </b>{resource.isbn_10}</p>
                <p><b> ISBN 13: </b>{resource.isbn_13}</p>
            </div>
            
        } else if (type == "music"){
   
            Jsx= <div>
            <p><b> Artist: </b>{resource.artist}</p>
            <p><b> Release: </b>{resource.release}</p>
            <p><b> ASIN: </b>{resource.ASIN}</p>
            <p><b> Label: </b>{resource.label}</p>
            <p><b> Type: </b></p>
            </div>


        } else if (type ==  "movie"){

            Jsx = <div>
                <p><b> Director: </b>{resource.director}</p>
                <p><b> Producers: </b>{resource.producers}</p>
                <p><b> Actors: </b>{resource.actors}</p>
                <p><b> Language: </b>{resource.language}</p>
                <p><b> Subtitles </b>{resource.subtitles}</p>
                <p><b> Dubbed: </b>{resource.dubbed}</p>
                <p><b> Release Date: </b>{resource.release_date}</p>
                <p><b> Run Time: </b>{resource.run_time}</p>
            </div>
        }



        return (

            <div class="card search-result">
            <div class="card-header">
            <b>Operation Type:</b> {operation}
            </div>
            <div class="card-body">
                <h1 class="card-title">{resource_data.title}</h1>
                <p class="card-text">
                {Jsx}
                </p>
            </div>
            <div class="card-footer">
            <button class="action-bar-btn btn btn-danger" type="button" onClick={() => this.handleClickRemove(index, resource_data.id)}><i class="fas fa-trash-alt"></i> Remove</ button>
            </div>
            </div>
            /*

            <div class="cart-item">
                    <span style={{ marginLeft: 10,fontFamily: 'Arial'}}> <strong>Operation:</strong> {operation}</span> <br />
                    <span style={{ marginLeft: 10,fontFamily: 'Arial'}}>  Title: {resource_data.title}</span> <br />
                    <span style={{ marginLeft: 10,fontFamily: 'Arial'}}>  Information: {JSON.stringify(resource_data)}</span><br />
                    <button class="cart-btn btn btn-primary" type="button" onClick={() => this.handleClickRemove(index)}> Remove </ button>
            </div>

            */
        );
    }

}

export default CartItem;