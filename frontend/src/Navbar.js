import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies'
import { apiCall } from './ApiCall';
import { Glyphicon,MenuItem, DropdownButton, ButtonToolbar,Image,Dropdown,SplitButton } from 'react-bootstrap';


class Navbar extends Component {

Test(){
  const id = cookie.load('id')  
    cookie.remove('logged') 
    cookie.remove('admin') 
    cookie.remove('email')
    cookie.remove('id')
    
    alert('Goodbye!')
    apiCall('/disconnect',{id})
    window.location.reload();
}


  
  render() {
    const logged = cookie.load('logged') === 'yes'
    const admin = cookie.load('admin') === 'yes'
    
    return (
      
      
    <div class='navbar-main' >

    <div class='menu'>
     { admin?
   ( <ButtonToolbar>
    <SplitButton
    bsStyle="default"
    title={<Glyphicon glyph='list'/> }
    pullRight
    id="split-button-dropup-pull-right"  
    >
    <MenuItem eventKey="1"  > <Link to="/" >
      <Glyphicon glyph='home'/> Home
            </Link></MenuItem>
      <MenuItem eventKey="2"  > <Link to="/create/user" >
      <Glyphicon glyph='user'/> Create user
            </Link></MenuItem>
      <MenuItem eventKey="3" ><Link to='/create'>
          <Glyphicon glyph='pencil'/> Create Resource
            </Link></MenuItem>
      <MenuItem eventKey="4" ><Link to='/loggedusers'>
      <Glyphicon glyph='eye-open'/> View Logged Users
            </Link></MenuItem>
      <MenuItem eventKey="5" ><Link to='/cart'>
      <Glyphicon glyph='shopping-cart'/> View Cart
            </Link></MenuItem>
      <MenuItem divider />
      <MenuItem eventKey="6" onClick={this.Test}><Link to='/login'>
      <Glyphicon glyph='log-out'/>  Log Off
            </Link>
            </MenuItem>
     
    </SplitButton>
  </ButtonToolbar>)
  :    (
  <ButtonToolbar>
   <DropdownButton
    bsStyle="default"
    title={<Glyphicon glyph='list'/>}
    noCaret
    id="dropdown-no-caret"  
    >
    
    <MenuItem eventKey="1" ><Link to='/'>
              Home
          </Link></MenuItem>
    <MenuItem divider />
    <MenuItem eventKey="2" onSelect={this.Test}><Link to='/login'>
    <Glyphicon glyph='log-out'/>  Log Off
            </Link></MenuItem>
   
  </DropdownButton>
</ButtonToolbar>)}
</div>

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

