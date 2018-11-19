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

class ResourceItem extends Component {

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
  handleClickEdit(id){
    if(this.state.editing) {
        const {title} = this.state;
        this.props.resource_data.title = title;
        console.log(this.props)
        const resource_type = this.props.resource_data.resource_type;
        delete this.props.resource_data.resource_type;
        const obj ={"resource_id":this.props.id, "resource_data": this.props.resource_data, "type": resource_type};
        console.log(obj)
        PUT('/resources', obj)
          .then( res => res.json() )
          .then ( json => {
            if(json.status === 0){
                window.location.reload()
            }
          })
        this.setState({editing: false})
    } else {
        this.setState({editing: true})
    }
    
      
  }

  handleClickDelete(id){
      DELETE('/resources', {"resource_id": id})
        .then( res => res.json() )
        .then ( json => {
          window.location.reload()
        })
      
  }

    render() {
        const { id, type, resource_data } = this.props
        const { editing } = this.state
        const admin = cookie.load('admin') === 'yes';

        return (
            <div class="resource-item">
                <div>
                    
                    <img alt="" style={picStyle} src={this.typeToPicture(type)}/>
                    {editing ? <input placeholder={resource_data.title} onChange={e => this.setState({title: e.target.value})}/>
                            :  <a> 
                                Title: <a style={{ marginLeft: 10,fontFamily: 'Arial'}}>{resource_data.title}</a><br></br>
                                Data: <a style={{ marginLeft: 10,fontFamily: 'Arial'}}>{JSON.stringify(resource_data)}</a>
                                
                                
                            </a>
                                
                            
                    }
                </div>
                { admin ? (<div>
                                <img alt="" style={icons} src={editPic} onClick={() => this.handleClickEdit(id)} />
                                <img alt="" style={icons} src={delPic} onClick={() => this.handleClickDelete(id)} />
                            </div>) : null

                }

            </div>
        );
    }
}

export default ResourceItem;

const picStyle = {
    width: '1%'
}

const icons = {
    height: 20,
    width: 20,
}