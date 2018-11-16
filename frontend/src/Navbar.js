import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies'
import { apiCall } from './ApiCall';
import { Glyphicon,MenuItem, DropdownButton, ButtonToolbar,Image,Dropdown,SplitButton } from 'react-bootstrap';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './SideBar.css';


class Navbar extends Component {

LogOut(){
  const id = cookie.load('id')  
    cookie.remove('logged') 
    cookie.remove('admin') 
    cookie.remove('email')
    cookie.remove('id')
    
    apiCall('/disconnect',{id})
    window.location.reload();
}


  
  render() {
    const logged = cookie.load('logged') === 'yes'
    const admin = cookie.load('admin') === 'yes'
    
    return (
      
      
   
   <div class='navbar-main' >
   {admin ?(
    <SideNav 
    onSelect={(selected) => {
        
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
   
        <NavItem eventKey="1" >
        
            <NavIcon><Link to="/" >
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /></Link>
            </NavIcon>
            <NavText>
            <Link to="/" >
                   Home
            </Link>
            </NavText>
            
        </NavItem>
        
    
        <NavItem eventKey="2" >
            <NavIcon>
            <Link to="/create/user" >
                <Glyphicon glyph='user'/>
                </Link>
            </NavIcon>
            <NavText>
            <Link to="/create/user" >
        Create user
            </Link>
            </NavText>
        </NavItem>
        <NavItem eventKey="3" >
            <NavIcon>
            <Link to="/create" >
                <Glyphicon glyph='pencil'/>
                </Link>
            </NavIcon>
            <NavText>
            <Link to="/create" >
        Create Resource
            </Link>
            </NavText>
        </NavItem>
        <NavItem eventKey="4" >
            <NavIcon>
            <Link to="/loggedusers" >
                <Glyphicon glyph='eye-open'/>
                </Link>
            </NavIcon>
            <NavText>
            <Link to="/loggedusers" >
            View Logged Users
            </Link>
            </NavText>
        </NavItem>
        <NavItem eventKey="5" >
            <NavIcon>
            <Link to="/cart" >
                <Glyphicon glyph='shopping-cart'/>
                </Link>
            </NavIcon>
            <NavText>
            <Link to="/cart" >
        View Cart
            </Link>
            </NavText>
        </NavItem>
       
        <NavItem eventKey="6" >
            <NavIcon>
            <Link to="/Transactions" >
                <Glyphicon glyph='list-alt'/>
                </Link>
            </NavIcon>
            <NavText>
            <Link to="/cart" >
        Transactions History
            </Link>
            </NavText>
        </NavItem>



        <NavItem eventKey="7" onClick={this.LogOut}>
            <NavIcon>
            <Link to="/" >
                <Glyphicon glyph='log-out'/>
                </Link>
            </NavIcon>
            <NavText>
            <Link to="/" >
        Log Out
            </Link>
            </NavText>
        </NavItem>
       
    </SideNav.Nav>
</SideNav>) :
<SideNav 
    onSelect={(selected) => {
        
    }}
>
    <SideNav.Toggle />
    <SideNav.Nav defaultSelected="home">
        <NavItem eventKey="1" >
            <NavIcon><Link to="/" >
                <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} /></Link>
            </NavIcon>
            <NavText>
            <Link to="/" >
                   Home
            </Link>
            </NavText>
        </NavItem>
       
        <NavItem eventKey="2" onClick={this.LogOut}>
            <NavIcon>
            <Link to="/" >
                <Glyphicon glyph='log-out'/>
                </Link>
            </NavIcon>
            <NavText>
            <Link to="/" >
        Log Out
            </Link>
            </NavText>
        </NavItem>
       
    </SideNav.Nav>
</SideNav>}



  {/*

        {!logged?<Redirect to="/login"/> : null}

        {logged?         
         (<Link to="/">
            <div class="home"> <span><i class="fas fa-home"></i>  </span>Home</div>
          </Link>)
          : null }
          
        <div/>

        <div class="links">
        
        { admin?         
         (<Link to="/create/user" class="leftside">
            <div><span><i class="fas fa-user-plus"></i> </span>Create User</div>
          </Link>)
          : null }
          
          { admin? 
           (<Link to="/loggedusers" class="leftside" >
              <div ><span><i class="fas fa-users"></i> </span>Logged Users</div>
            </Link>)
          : null }

          { admin? 
           (<Link to="/transactions" class="leftside" >
              <div ><span><i class="far fa-question-circle"></i> </span>Transactions</div>
            </Link>)
          : null }

          { admin? 
           (<Link to="/create" class="leftside" >
              <div ><span><i class="fas fa-book-reader"></i> </span>Create ressource</div>
            </Link>)
          : null }

           { admin? 
           (<Link to="/cart" class="leftside" >
              <div ><span><i class="fas fa-cart-arrow-down"></i> </span>View Cart</div>
            </Link>)
          : null }
          
          <Link to="/login">
          <div onClick={ _ => {
                const id = cookie.load('id')  
                cookie.remove('logged') 
                cookie.remove('admin') 
                cookie.remove('email')
                cookie.remove('id')
                
                apiCall('/disconnect',{id})
              }} 
                class="navbar-logout"><span><i class="fas fa-sign-out-alt"></i> </span>Log out</div>
          </Link>
          

           
        </div>
        
            */}
      
      </div>
      
            );
  }
}

export default Navbar;

