import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies'
import { apiCall } from './ApiCall';
import { Glyphicon,MenuItem, DropdownButton, ButtonToolbar,Image,Dropdown } from 'react-bootstrap';


class Navbar extends Component {




  
  render() {
    const logged = cookie.load('logged') === 'yes'
    const admin = cookie.load('admin') === 'yes'

    
    let create_resource = '/create'
    let create_user = '/create/user' 
    let logged_users = '/loggedusers'
    let view_cart = '/cart' 

    
    return (
      
      
    <div class="navbar-main" >

    
    <ButtonToolbar>
    <DropdownButton
    bsStyle="default"
    title={<Glyphicon glyph='list'/>}
    noCaret
    pullRight
    id="dropdown-no-caret"  
    >
      <MenuItem eventKey="1">Action</MenuItem>
      <MenuItem eventKey="2">Another actionaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</MenuItem>
      <MenuItem eventKey="3" active>
        Active Item
      </MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="4">Separated link</MenuItem>
     
    </DropdownButton>
  </ButtonToolbar>


  {/*

        {!logged?<Redirect to="/login"/> : null}

        {logged?         
         (<Link to="/">
            <div class="home"> <span><img src={require('./Home.png')}/></span>Home</div>
          </Link>)
          : null }
          
        <div/>

        <div class="links">
        
        { admin?         
         (<Link to="/create/user" class="leftside">
            <div >Create User</div>
          </Link>)
          : null }
          
          { admin? 
           (<Link to="/loggedusers" class="leftside" >
              <div ><span><img  src={require('./LogUsers.png')}/></span>Logged Users</div>
            </Link>)
          : null }

          { admin? 
           (<Link to="/create" class="leftside" >
              <div ><span><img  src={require('./BookResource.gif')}/></span>Create ressource</div>
            </Link>)
          : null }

           { admin? 
           (<Link to="/cart" class="leftside" >
              <div ><span><img src={require('./Cart.png')}/></span>View Cart</div>
            </Link>)
          : null }
          
          <Link to="/login">
          <div onClick={ _ => {
                const id = cookie.load('id')  
                cookie.remove('logged') 
                cookie.remove('admin') 
                cookie.remove('email')
                cookie.remove('id')
                
                alert('Goodbye!')
                apiCall('/disconnect',{id})
              }} 
                class="navbar-logout"><span><img  src={require('./LogOff.png')}/></span>Log out</div>
          </Link>
          

           
        </div>
        
            */}
      
      </div>
      
            );
  }
}

export default Navbar;

