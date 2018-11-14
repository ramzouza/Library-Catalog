import React, { Component } from 'react';
import {GET, POST, PUT} from './ApiCall';
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

            director:'',
            producers:'',
            actors:'',
            subtitles:'',
            dubbed:'',
            release_date:'',
            run_time:'',



            line_items: []
        }
    }

    handleNewResourceLineItem(){
        POST('/addLineItem', {"resource_id": this.props.resource.id})
        .then( res => res.json() )
        .then ( json => {
          console.log(json.results);
        }).catch( err => {
        })
    }



    componentDidMount(){
        const {resource, line_items} = this.props
        const {title, author, format, pages, publisher, language , isbn_10, isbn_13, available , director, producers, actors,  subtitles,dubbed, release_date,run_time} = resource
        this.setState({title,author, format, pages, publisher, language , isbn_10, isbn_13, available , director, producers, actors, subtitles,dubbed, release_date,run_time })

        this.setState({"line_items":line_items}); // for line items
    }

    handleSave(){
        this.setState({editing: false})
        const { id, type } = this.props
        const {title, author, format, pages, publisher, language , isbn_10, isbn_13, available , director, producers, actors,  subtitles,dubbed, release_date,run_time } = this.state
        PUT('/resources',{type, resource_id: id, resource_data: {title, author, format, pages, publisher, language , isbn_10, isbn_13, available , director, producers, actors,  subtitles,dubbed, release_date,run_time}})
            .then( res => res.json())
            .then( res => {
                console.log(JSON.stringify(res))
            })
    }

    render() {
        const { id, type, resource } = this.props
        const admin = cookie.load('admin') === 'yes';
        const editing = this.state.editing;
        const line_items = this.state.line_items;
        let Jsx;
        let cardJsx;
        if (resource.restype == "book"){
            cardJsx = <div>
                    <p><b> Author: </b>{resource.author}</p>
                    <p><b> Format: </b>{resource.format}</p>
                    <p><b> Pages: </b>{resource.pages}</p>
                    <p><b> Publisher: </b>{resource.publisher}</p>
                    <p><b> Language: </b>{resource.language}</p>
                    <p><b> isbn_10: </b>{resource.isbn_10}</p>
                    <p><b> isbn_13: </b>{resource.isbn_13}</p>
                    <p><b> Copies Available: </b>{resource.available}</p>
            </div>
            Jsx = <div>
                {editing ? <p> Author: <input placeholder={resource.author}  onChange={evt => {this.setState({author: evt.target.value})}} /></p> : <p><b> Author: </b>{resource.author}</p>}
                {editing ? <p> Format: <input placeholder={resource.format}  onChange={evt => {this.setState({format: evt.target.value})}} /></p> : <p><b> Format: </b>{resource.format}</p>}
                {editing ? <p> Pages: <input placeholder={resource.pages}  onChange={evt => {this.setState({pages: evt.target.value})}} /></p> : <p><b> Pages: </b>{resource.pages}</p>}
                {editing ? <p> Publisher: <input placeholder={resource.publisher}  onChange={evt => {this.setState({publisher: evt.target.value})}} /></p> : <p><b> Publisher: </b>{resource.publisher}</p>}
                {editing ? <p> Language: <input placeholder={resource.language}  onChange={evt => {this.setState({language: evt.target.value})}} /></p> : <p><b> Language: </b>{resource.language}</p>}
                {editing ? <p> isbn_10: <input placeholder={resource.isbn_10}  onChange={evt => {this.setState({isbn_10: evt.target.value})}} /></p> : <p><b> isbn_10: </b>{resource.isbn_10}</p>}
                {editing ? <p> isbn_13: <input placeholder={resource.isbn_13}  onChange={evt => {this.setState({isbn_13: evt.target.value})}} /></p> : <p><b> isbn_13: </b>{resource.isbn_13}</p>}
                {editing ? <p> Copies Available: <input placeholder={resource.available}  onChange={evt => {this.setState({available: evt.target.value})}} /></p> : <p><b> Copies Available: </b>{resource.available}</p>}
            </div>
        } else if (resource.restype == "magazine"){
            console.log(resource)
            cardJsx = <div>
                <p><b>Publisher: </b>{resource.publisher}</p>
                <p><b>Language: </b>{resource.language}</p>
                <p><b>ISBN 10: </b>{resource.isbn_10}</p>
                <p><b>ISBN 13: </b>{resource.isbn_13}</p>
            </div>

            Jsx= <div>
                {editing ? <p> Publisher: <input placeholder={resource.publisher}  onChange={evt => {this.setState({publisher: evt.target.value})}} /></p> : <p><b> Publisher: </b>{resource.publisher}</p>}
                {editing ? <p> Language: <input placeholder={resource.language}  onChange={evt => {this.setState({language: evt.target.value})}} /></p> : <p><b> Language: </b>{resource.language}</p>}
                {editing ? <p> isbn_10: <input placeholder={resource.isbn_10}  onChange={evt => {this.setState({isbn_10: evt.target.value})}} /></p> : <p><b> isbn_10: </b>{resource.isbn_10}</p>}
                {editing ? <p> isbn_13: <input placeholder={resource.isbn_13}  onChange={evt => {this.setState({isbn_13: evt.target.value})}} /></p> : <p><b> isbn_13: </b>{resource.isbn_13}</p>}
            </div>
            
        } else if (resource.restype == "music"){
            cardJsx = <div>
                <p><b>Type: </b>{resource.type}</p>
                <p><b>Artist: </b>{resource.artist}</p>
                <p><b>Release: </b>{resource.release}</p>
                <p><b>ASIN: </b>{resource.ASIN}</p>
                <p><b>Label: </b>{resource.label}</p>
                <p><b>Copies Available: </b>{resource.available}</p>
            </div>
        } else if (resource.restype == "movie"){
            cardJsx = <div>
                <p><b>Director: </b>{resource.director}</p>
                <p><b>Producers: </b>{resource.producers}</p>
                <p><b>Actors: </b>{resource.actors}</p>
                <p><b>Language: </b>{resource.language}</p>
                <p><b>Subtitles: </b>{resource.subtitles}</p>
                <p><b>Dubbed: </b>{resource.dubbed}</p>
                <p><b>Release Date: </b>{resource.release_date}</p>
                <p><b>Run Time: </b>{resource.run_time}</p>
                <p><b>Copies Available: </b>{resource.available}</p>
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
        <div class="card search-result">
            <div class="card-body">
                <h1>{resource.title}</h1>
                {cardJsx}
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target={"#edit"+resource.id}>Details</button>
            </div>


            <div class="modal  fade" tabindex="-1" role="dialog" id={"edit"+resource.id}>
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

                        <table class="table">
                        <tr>
                            <th>id</th>
                            <th>type</th>
                            <th>User Id</th>
                            <th>Date Due</th>
                            <th><button type="button" onClick={ _ => this.handleNewResourceLineItem()} class="btn btn-success btn-sm"><i class="fas fa-plus"></i></button></th>
                        </tr>
                        {resource.lineItem.map( line_item => <ResourceLineItem key={resource.resource_id} id={resource.resource_id} type={resource.restype} line_item={line_item} resource={resource} />)}
                        </table>

                    </div>
                    <div class="modal-footer">
                        <button type="button" onClick={() => this.setState({editing: true})} class="btn btn-primary">Edit</button>
                        <button type="button" class="btn btn-primary">Loan</button>
                        <button type="button" onClick={ this.handleSave.bind(this) }  class="btn btn-secondary" data-dismiss="modal">Save</button>
                    </div>
                    </div>
                </div>
            </div>




        </div>
        );
    }
}

export default SearchResult;