import React, { Component } from 'react';
import {PUT, DELETE} from './ApiCall';

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
            case "Book":
                return bookPic
            case "Magazine":
                return magPic
            case "Movie":
                return movPic
            case "Music":
                return musicPic
            default: 
                return defPic
        } 
    }



  handleClickEdit(id){
    if(this.state.editing) {
        const {title} = this.state;
        const res = {id,title};
        PUT('/resources', {"resource_data": res})
          .then( res => res.json() )
          .then ( json => {
            alert(json.message)
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
          alert(json.message)
          window.location.reload()
        })
      
  }

    render() {
        const { id, title, type } = this.props
        const { editing } = this.state
        return (
            <div style={main}>
                <div>
                    <img alt="" style={picStyle} src={this.typeToPicture(type)}/>
                    {editing ? <input placeholder={title} onChange={e => this.setState({title: e.target.value})}/>
                            :  <a>Title: <a style={{ marginLeft: 10,fontFamily: 'Arial'}}>{title}</a></a>}
                </div>
                <div>
                    <img alt="" style={icons} src={editPic} onClick={() => this.handleClickEdit(id)} />
                    <img alt="" style={icons} src={delPic} onClick={() => this.handleClickDelete(id)} />
                </div>

            </div>
        );
    }
}

export default ResourceItem;
const main = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Impact',
    height: 30,
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