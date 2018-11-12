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
            sbn_13:'',
            available: '',
            editing: false,
            title: ''
        }
    }



    componentDidMount(){
        const {resource} = this.props
        const {title, author, format, pages, publisher, language , isbn_10, isbn_13, available } = resource
        this.setState({title,author, format, pages, publisher, language , isbn_10, isbn_13, available })
    }

    handleSave(){
        this.setState({editing: false})
        const { id, type } = this.props
        const {title, author, format, pages, publisher, language , isbn_10, isbn_13, available } = this.state
        PUT('/resources',{type, resource_id: id, resource_data: {title, author, format, pages, publisher, language , isbn_10, isbn_13, available}})
            .then( res => res.json())
            .then( res => {
                alert(JSON.stringify(res))
            })
    }

    render() {
        const { id, type, resource } = this.props
        const admin = cookie.load('admin') === 'yes';
        const editing = this.state.editing
        const line_items = resource.lineItem

        console.log(line_items);
        let Jsx;
        let icon;
        if (resource.restype == "book"){
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
            icon = <i class="fas fa-book"></i>
        } else if (resource.restype == "magazine"){
            console.log(resource)
            Jsx = <div>
                <p><b>Publisher: </b>{resource.publisher}</p>
                <p><b>Language: </b>{resource.language}</p>
                <p><b>ISBN 10: </b>{resource.isbn_10}</p>
                <p><b>ISBN 13: </b>{resource.isb_13}</p>
            </div>
            icon = <i class="fas fa-book-reader"></i>
        } else if (resource.restype == "music"){
            Jsx = <div>
                <p><b>Type: </b>{resource.type}</p>
                <p><b>Artist: </b>{resource.artist}</p>
                <p><b>Release: </b>{resource.release}</p>
                <p><b>ASIN: </b>{resource.ASIN}</p>
                <p><b>Label: </b>{resource.label}</p>
                <p><b>Copies Available: </b>{resource.available}</p>
            </div>
            icon = <i class="fas fa-music"></i>
        } else if (resource.restype == "movie"){
            Jsx = <div>
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
            icon = <i class="fas fa-film"></i>
        }

        return (
        <div class="card search-result">
            <div class="card-body">
                {icon}
                <h1>{resource.title}</h1>
                {Jsx}
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#edit">Details</button>
            </div>


            <div class="modal  fade" tabindex="-1" role="dialog" id="edit">
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
                        {
                            line_items.map( line_item => <ResourceLineItem key={line_item.id} id={line_item.id} type={resource.restype} line_item={line_item} resource={resource} />)
                        }
                        {
                            admin ?
                            <div>
                                <button type="button" class="btn btn-danger"><i class="fas fa-plus"></i></button>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">id</th>
                                            <th scope="col">type</th>
                                            <th scope="col">User Id</th>
                                            <th scope="col">Date Due</th>
                                        </tr>
                                    </thead> 
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>:
                            <div></div>
                        }
                        
                    

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