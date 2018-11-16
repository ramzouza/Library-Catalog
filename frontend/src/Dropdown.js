import React, { Component } from 'react'
import { ButtonToolbar, DropdownButton, MenuItem, Image } from 'react-bootstrap'
import cookie from 'react-cookies'
import { apiCall } from './ApiCall';



class Dropdown extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showAvatar: false,
    };
    this.handleShowAvatar = this.handleShowAvatar.bind(this);
    this.handleCloseAvatar = this.handleCloseAvatar.bind(this);
  }

  handleCloseAvatar() {
    this.setState({ showAvatar: false });
  }

  handleShowAvatar() {
    this.setState({ showAvatar: true });
  }

  
  render() {

    const logged = cookie.load('logged') === 'yes'
    const admin = cookie.load('admin') === 'yes'

    let create_resource = '/create'
    let create_user = '/create/user' 
    let logged_users = '/loggedusers'
    let view_cart = '/cart' 
    let log_out = '/login/'
  
    let avatarPath;

    if (this.props.user.display_image !== ""){
      avatarPath = "\\images\\avatar\\" + this.props.user.display_image;
    } else {
      avatarPath = "\\images\\avatar\\4.png";
    }
    // replaced <FontAwesome name='fas fa-cog fa-2x' /> with avatar for mobile friendliness (see Headermenu.js)
    return (
    
     <ButtonToolbar>
          <DropdownButton
            bsStyle="default"
            title = {<Image src={avatarPath} onClick={this.handleShowAvatar} width={40} circle />}
            id="dropdown-no-caret"
          >
            <MenuItem eventKey="1" href={create_resource} >Create Resource</MenuItem>    
			<MenuItem eventKey="2" href={create_user}>Create User</MenuItem>
            <MenuItem eventKey="3" href={logged_users} >Logged Users</MenuItem>    
			<MenuItem eventKey="4" href={view_cart}>View Cart</MenuItem>            
			      <MenuItem divider />
            <MenuItem eventKey="4" onClick={_ => {
                const id = cookie.load('id')  
                cookie.remove('logged') 
                cookie.remove('admin') 
                cookie.remove('email')
                cookie.remove('id')
                
                apiCall('/disconnect',{id})
             } }>Logout</MenuItem>
          </DropdownButton>


    </ButtonToolbar > 
    
    )
  }
}

export default Dropdown;