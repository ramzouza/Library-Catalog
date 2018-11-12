import React, { Component } from 'react';
import {GET, POST} from './ApiCall';
import cookie from 'react-cookies'

class ResourceLineItem extends Component {
    constructor(){
        super()

        this.state = {
            editing: false,
            title: ''
        }
    }

    render() {
        //key={line_item.id} id={line_item.id} type={resource.restype} resource={resource}
        const { id, type, line_item, resource } = this.props
        const admin = cookie.load('admin') === 'yes';
        const line_items = resource.line_items;
        return (

                <tr>
                    <td>{id}</td>
                    <td>{type}</td>
                    <td>{line_item.user_id ? line_item.user_id : "Available"}</td>
                    <td>{line_item.date_due}</td>
                    <td>
                        <button type="button" class="btn btn-danger">Delete</button>
                    </td>
                </tr>   
        );

    }
}

export default ResourceLineItem;