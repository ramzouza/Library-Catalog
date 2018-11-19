import React, { Component } from 'react';
import {GET, POST, PUT, DELETE} from './ApiCall';
import cookie from 'react-cookies'
import ResourceLineItem from './ResourceLineItem';

class SearchResult extends Component {


    constructor(){
        super()

        this.state = {
            title: '',
            author: '',
            format: '',
            pages: '',
            publisher: '',
            language: '' ,
            isbn_10: '',
            isbn_13:'',
            available: '',
            editing: false,
            title: '',

            artist:'',
            release:'',
            ASIN:'',
            label:'',
            director:'',
            producers:'',
            actors:'',
            subtitles:'',
            dubbed:'',
            release_date:'',
            run_time:'',



            line_items: [],
            message: ""
        }

        this.handleDecrementAvailable = this.handleDecrementAvailable.bind(this)
        this.handleIncrementAvailable = this.handleIncrementAvailable.bind(this)
    }

    handleNewResourceLineItem(){
        POST('/addLineItem', {"resource_id": this.props.resource.id})
        .then( res => res.json() )
        .then ( json => {
            const line_item = json.lineItem;
            const line_items = this.state.line_items.slice()
            line_items.push(line_item)
            this.setState({"line_items":line_items,"available":this.state.available+1})
        }).catch( err => {
        })
    }

    handleDecrementAvailable(){
        this.setState({"available":this.state.available-1})
    }

    handleIncrementAvailable(){
        this.setState({"available":this.state.available+1})
    }



    componentDidMount(){
        const {resource} = this.props
        const {title, author, format, pages, publisher, language , isbn_10, isbn_13, available , director, producers, actors,  subtitles,dubbed, release_date,run_time, artist, release,ASIN, label} = resource
        this.setState({title,author, format, pages, publisher, language , isbn_10, isbn_13, available , director, producers, actors, subtitles,dubbed, release_date,run_time, artist, release,ASIN, label })
        this.setState({"line_items": resource.lineItem})
    }

    handleSave(){
        let isAdmin = cookie.load('admin') === 'yes'
        const { id, type, resource } = this.props
        const {title, author, format, pages, publisher, language , isbn_10, isbn_13, available , director, producers, actors,  subtitles,dubbed, release_date,run_time, artist, release,ASIN, label } = this.state
        this.setState({editing: false})
        
        if(isAdmin){
            PUT('/resources',{type, resource_id: id, resource_data: {title, author, format, pages, publisher, language , isbn_10, isbn_13, available , director, producers, actors,  subtitles,dubbed, release_date,run_time, artist, release,ASIN, label}})
                .then( res => res.json())
                .then( res => {
                })
        } else {
            const resource_data =  {id, type, title, author, format, pages, publisher, language , isbn_10, isbn_13, available , director, producers, actors,  subtitles,dubbed, release_date,run_time, artist, release,ASIN, label}
            let found = this.findAvailable(resource.lineItem)
            if(found) this.addToCookies({...resource_data, id: found.id})
            else this.setState({message:`Sorry, we are out of ${title}. Try to loan it later.`});
        }
    }

    findAvailable(lineItems){
        return lineItems.find( x => x.user_id === null )
    }
    addToCookies(newCartItem){
        console.log({newCartItem})
        let cart = cookie.load('userCart') || []
        let data = JSON.stringify(newCartItem)
            data = JSON.parse(data)
        if(!cart.find(x => x.id === newCartItem.id)){
            if(cart.length <= 9){
                cart.push(data)
                cookie.save('userCart', cart)
                this.setState({message: "Resource is returned."})
            } else this.setState({message:'You have too many items in your cart !'})
            
        } else this.setState({message:'This resource is aleady in your cart !'});

        console.log('userCart',cookie.load('userCart'))
    }

    handleDelete(){
        const { id, type } = this.props
        const {title, author, format, pages, publisher, language , isbn_10, isbn_13, available , director, producers, actors,  subtitles,dubbed, release_date,run_time, artist, release,ASIN, label } = this.state
        DELETE('/resources',{type, resource_id: id, resource_data: {title, author, format, pages, publisher, language , isbn_10, isbn_13, available , director, producers, actors,  subtitles,dubbed, release_date,run_time, artist, release,ASIN, label}})
            .then( res => res.json())
            .then( res => {
            })
    }

    render() {
        const { id, type, resource } = this.props
        const admin = cookie.load('admin') === 'yes';
        const editing = this.state.editing;
        let Jsx;
        let cardJsx;
        let icon;

        if (resource.restype == "book"){
            icon = <i class="fas fa-book"></i>;
            cardJsx = <div>
                    <p><b> Author: </b>{resource.author}</p>
                    <p><b> Language: </b>{resource.language}</p>
            </div>
            Jsx = <div>
                {editing ? <p> Author: <input placeholder={resource.author}  onChange={evt => {this.setState({author: evt.target.value})}} /></p> : <p><b> Author: </b>{resource.author}</p>}
                {editing ? <p> Format: <input placeholder={resource.format}  onChange={evt => {this.setState({format: evt.target.value})}} /></p> : <p><b> Format: </b>{resource.format}</p>}
                {editing ? <p> Pages: <input placeholder={resource.pages}  onChange={evt => {this.setState({pages: evt.target.value})}} /></p> : <p><b> Pages: </b>{resource.pages}</p>}
                {editing ? <p> Publisher: <input placeholder={resource.publisher}  onChange={evt => {this.setState({publisher: evt.target.value})}} /></p> : <p><b> Publisher: </b>{resource.publisher}</p>}
                {editing ? <p> Language: <input placeholder={resource.language}  onChange={evt => {this.setState({language: evt.target.value})}} /></p> : <p><b> Language: </b>{resource.language}</p>}
                {editing ? <p> isbn_10: <input placeholder={resource.isbn_10}  onChange={evt => {this.setState({isbn_10: evt.target.value})}} /></p> : <p><b> ISBN 10: </b>{resource.isbn_10}</p>}
                {editing ? <p> isbn_13: <input placeholder={resource.isbn_13}  onChange={evt => {this.setState({isbn_13: evt.target.value})}} /></p> : <p><b> ISBN 13: </b>{resource.isbn_13}</p>}
                {editing ? <p> Copies Available: <input placeholder={this.state.available}  onChange={evt => {this.setState({available: evt.target.value})}} /></p> : <p><b> Copies Available: </b>{this.state.available}</p>}
            </div>
        } else if (resource.restype == "magazine"){
            icon = <i class="fas fa-book-reader"></i>;
            cardJsx = <div>
                <p><b>Publisher: </b>{resource.publisher}</p>
                <p><b>Language: </b>{resource.language}</p>
            </div>

            Jsx= <div>
                {editing ? <p> Publisher: <input placeholder={resource.publisher}  onChange={evt => {this.setState({publisher: evt.target.value})}} /></p> : <p><b> Publisher: </b>{resource.publisher}</p>}
                {editing ? <p> Language: <input placeholder={resource.language}  onChange={evt => {this.setState({language: evt.target.value})}} /></p> : <p><b> Language: </b>{resource.language}</p>}
                {editing ? <p> isbn_10: <input placeholder={resource.isbn_10}  onChange={evt => {this.setState({isbn_10: evt.target.value})}} /></p> : <p><b> ISBN 10: </b>{resource.isbn_10}</p>}
                {editing ? <p> isbn_13: <input placeholder={resource.isbn_13}  onChange={evt => {this.setState({isbn_13: evt.target.value})}} /></p> : <p><b> ISBN 13: </b>{resource.isbn_13}</p>}
            </div>
            
        } else if (resource.restype == "music"){
            icon = <i class="fas fa-music"></i>;
            cardJsx = <div>
                <p><b>Artist: </b>{resource.artist}</p>
                <p><b>Release: </b>{resource.release}</p>
            </div>

            Jsx= <div>
            {editing ? <p> Artist: <input placeholder={resource.artist}  onChange={evt => {this.setState({artist: evt.target.value})}} /></p> : <p><b> Artist: </b>{resource.artist}</p>}
            {editing ? <p> Release: <input placeholder={resource.release}  onChange={evt => {this.setState({release: evt.target.value})}} /></p> : <p><b> Release: </b>{resource.release}</p>}
            {editing ? <p> ASIN: <input placeholder={resource.ASIN}  onChange={evt => {this.setState({ASIN: evt.target.value})}} /></p> : <p><b> ASIN: </b>{resource.ASIN}</p>}
            {editing ? <p> Label: <input placeholder={resource.label}  onChange={evt => {this.setState({label: evt.target.value})}} /></p> : <p><b> Label: </b>{resource.label}</p>}
            {editing ? <p> Type: <input placeholder={resource.type}  onChange={evt => {this.setState({label: evt.target.value})}} /></p> : <p><b> Type: </b>{resource.type}</p>}
            </div>


        } else if (resource.restype == "movie"){
            icon = <i class="fas fa-film"></i>;
            cardJsx = <div>
                <p><b>Actors: </b>{resource.actors}</p>
                <p><b>Language: </b>{resource.language}</p>
            </div>

            Jsx = <div>
                {editing ? <p> Director: <input placeholder={resource.director}  onChange={evt => {this.setState({director: evt.target.value})}} /></p> : <p><b> Director: </b>{resource.director}</p>}
                {editing ? <p> Producers: <input placeholder={resource.producers}  onChange={evt => {this.setState({producers: evt.target.value})}} /></p> : <p><b> Producers: </b>{resource.producers}</p>}
                {editing ? <p> Actors: <input placeholder={resource.actors}  onChange={evt => {this.setState({actors: evt.target.value})}} /></p> : <p><b> Actors: </b>{resource.actors}</p>}
                {editing ? <p> Language: <input placeholder={resource.language}  onChange={evt => {this.setState({language: evt.target.value})}} /></p> : <p><b> Language: </b>{resource.language}</p>}
                {editing ? <p> Subtitles: <input placeholder={resource.subtitles}  onChange={evt => {this.setState({subtitles: evt.target.value})}} /></p> : <p><b> Subtitles </b>{resource.subtitles}</p>}
                {editing ? <p> Dubbed: <input placeholder={resource.dubbed}  onChange={evt => {this.setState({dubbed: evt.target.value})}} /></p> : <p><b> Dubbed: </b>{resource.dubbed}</p>}
                {editing ? <p> Release Date: <input placeholder={resource.release_date}  onChange={evt => {this.setState({release_date: evt.target.value})}} /></p> : <p><b> Release Date: </b>{resource.release_date}</p>}
                {editing ? <p> Run Time: <input placeholder={resource.run_time}  onChange={evt => {this.setState({run_time: evt.target.value})}} /></p> : <p><b> Run Time: </b>{resource.run_time}</p>}
            </div>



        }

    
        return (

<React.Fragment>
        <div class="card search-result animated fadeInUp">
            <div class="card-body">
                {icon}
                <h1>{resource.title}</h1>
                {cardJsx}
                <button type="button" class="btn btn-default btn-search" onClick={ _ => this.props.handler(resource.id)}  data-toggle="modal" data-target={"#edit"+resource.id}>Details</button>
            </div>
        </div>

<div class="modal fade" tabindex="-1" role="dialog" id={"edit"+resource.id}>
<div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    
        <div class="modal-title">
        {editing ? <h1><input placeholder={resource.title}  onChange={evt => {this.setState({title: evt.target.value})}} /></h1> : <h1>{resource.title}</h1>}
        </div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
    </div>
    <div class="modal-body">
        {Jsx}
        <p class="animated fadeIn">{this.state.message}</p>
{admin?
        <table class="table">
        <tr>
            <th>id</th>
            <th>type</th>
            <th>User Id</th>
            <th>Date Due</th>
            <th><button type="button" onClick={ _ => this.handleNewResourceLineItem()} class="btn btn-success btn-sm"><i class="fas fa-plus"></i></button></th>
        </tr>
        {this.state.line_items.map( line_item => <ResourceLineItem id={resource.resource_id} handler={this.handleDecrementAvailable} handler2={this.handleIncrementAvailable} type={resource.restype} line_item={line_item} resource={resource} />)}
        </table>
: <table></table>}
    </div>
    <div class="modal-footer">
        {admin? <button type="button" onClick={() => this.setState({editing: true})} class="btn btn-primary">Edit</button> : <div></div>}
        {admin?
            <div> </div>:
            <button type="button" onClick={ this.handleSave.bind(this) } class="btn btn-primary" data-dismiss="modal">Add to Cart</button>
        }
        {admin? <button type="button" onClick={ this.handleSave.bind(this) }  class="btn btn-secondary" data-dismiss="modal">Save</button> : <div></div>}
        {admin? <button type="button" onClick={ this.handleDelete.bind(this) }  class="btn btn-secondary" data-dismiss="modal">Delete</button> : <div></div>}
    </div>
    </div>
</div>
</div>
</React.Fragment>
        );
    }
}

export default SearchResult;