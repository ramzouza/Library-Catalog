import React, { Component } from 'react';
import {GET, POST} from './ApiCall';
import cookie from 'react-cookies'

class SearchResult extends Component {


    constructor(){
        super()

        this.state = {
            editing: false,
            title: ''
        }
    }

    handleDetails(){

    }

    render() {
        const { id, type, resource } = this.props
        const admin = cookie.load('admin') === 'yes';


        
        let Jsx;
        if (resource.restype == "book"){
            Jsx = <div>
                <p><b>Author: </b>{resource.author}</p>
                <p><b>Format: </b>{resource.format}</p>
                <p><b>Pages: </b>{resource.pages}</p>
                <p><b>Publisher: </b>{resource.publisher}</p>
                <p><b>Language: </b>{resource.language}</p>
                <p><b>ISBN 10: </b>{resource.isbn_10}</p>
                <p><b>ISBN 13: </b>{resource.isb_13}</p>
                <p><b>Copies Available: </b>{resource.available}</p>
            </div>
        } else if (resource.restype == "magazine"){
            console.log(resource)
            Jsx = <div>
                <p><b>Publisher: </b>{resource.publisher}</p>
                <p><b>Language: </b>{resource.language}</p>
                <p><b>ISBN 10: </b>{resource.isbn_10}</p>
                <p><b>ISBN 13: </b>{resource.isb_13}</p>
            </div>
        } else if (resource.restype == "music"){
            Jsx = <div>
                <p><b>Type: </b>{resource.type}</p>
                <p><b>Artist: </b>{resource.artist}</p>
                <p><b>Release: </b>{resource.release}</p>
                <p><b>ASIN: </b>{resource.ASIN}</p>
                <p><b>Label: </b>{resource.label}</p>
                <p><b>Copies Available: </b>{resource.available}</p>
            </div>
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
        }

       

        return (
        <div class="card search-result">
            <div class="card-body">
                <h1>{resource.title}</h1>
                {Jsx}
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#edit">Details</button>
            </div>


            <div class="modal  fade" tabindex="-1" role="dialog" id="edit">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title">{resource.title}</h1>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        {Jsx}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Edit</button>
                        <button type="button" class="btn btn-primary">Loan</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>




        </div>
        );
    }
}

export default SearchResult;