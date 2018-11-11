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

    render() {
        const { id, type, resource } = this.props
        const admin = cookie.load('admin') === 'yes';

        return (
        <div class="card">
            <div class="card-body">
            This is some text within a card body.
            </div>
        </div>
        );
    }
}

export default SearchResult;