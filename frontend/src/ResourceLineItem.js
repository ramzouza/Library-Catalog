import React, { Component } from 'react';
import {GET, POST} from './ApiCall';
import cookie from 'react-cookies'

class ResourceLineItem extends Component {
    constructor(){
        super()

        this.state = {
            editing: false,
            title: '',
            deleted: false
        }

    }

    handleDeleteResourceLineItem(){
        POST('/deleteLineItem', {"resource_line_item_id": this.props.line_item.id})
        .then( res => res.json() )
        .then ( json => {
            this.setState({deleted: true});
            this.props.handler()
        }).catch( err => {
        })
    }

    handleReturnResource(){
        const id = cookie.load('id')
        POST('/returnItem',{itemId: this.props.line_item.id}, {id} )
        .then(res=>res.json())
        .then(res => {
            alert('Resource returned')
            console.log('The res from loan',{res})
            this.setState({editing: false})
        })
    }

    render() {
        //key={line_item.id} id={line_item.id} type={resource.restype} resource={resource}
        const { id, type, line_item, resource } = this.props
        const admin = cookie.load('admin') === 'yes';
        let isDeleted = this.state.deleted;
        let jsx = <div></div>
        if (!isDeleted){
            jsx = <tr>
            <td>{line_item.id}</td>
            <td>{type}</td>
            <td>{line_item.user_id ? line_item.user_id : "Available"}</td>
            <td>{line_item.date_due}</td>
            <td style={{display: 'flex'}}>
                {admin? <button type="button" onClick={ _ => this.handleDeleteResourceLineItem()} class="btn btn-danger btn-sm" style={{width: 35, marginRight: 5}}><i class="fas fa-trash"></i></button> : <div></div>}
                {line_item.user_id ? <button type="button" onClick={ _ => this.handleReturnResource()} class="btn btn-warning btn-sm" style={{width: 35}}><i class="fas fa-inbox"></i></button> : <div></div>}
            </td>
        </tr> 
        }
        return (
            <React.Fragment>
            {jsx}
            </React.Fragment>
        );

    }
}

export default ResourceLineItem;