import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies'
import { apiCall } from './ApiCall';


class Navbar extends Component {




  
  render() {
    const logged = cookie.load('logged') === 'yes'
    const admin = cookie.load('admin') === 'yes'

     

    return (
      
      <div style={main} >

        {!logged?<Redirect to="/login"/> : null}

        {logged?         
         (<Link to="/" style={{textDecoration: 'none', color:'white' }}>
            <div style={Home}> <span><img src={require('./Home.png')}/></span>Home</div>
          </Link>)
          : null }
          
        <div/>

        <div style={{fontSize: 20,display:'flex',flexDirection: 'row',justifyContent: 'space-between',}}>
        
        { admin?         
         (<Link to="/create/user" style={LeftSide}>
            <div style={{padding: 15}}>Create User</div>
          </Link>)
          : null }
          
          { admin? 
           (<Link to="/loggedusers"style={LeftSide}>
              <div style={{padding: 15}}><span><img  src={require('./LogUsers.png')}/></span>Logged Users</div>
            </Link>)
          : null }

          { admin? 
           (<Link to="/create" style={LeftSide}>
              <div style={{padding: 15}}><span><img  src={require('./BookResource.gif')}/></span>Create ressource</div>
            </Link>)
          : null }

           { admin? 
           (<Link to="/cart" style={LeftSide}>
              <div style={{padding: 15}}><span><img src={require('./Cart.png')}/></span>View Cart</div>
            </Link>)
          : null }
          
          <Link to="/login" style={{textDecoration: 'none', color:'white' }}>
          <div onClick={ _ => {
                const id = cookie.load('id')  
                cookie.remove('logged') 
                cookie.remove('admin') 
                cookie.remove('email')
                cookie.remove('id')
                
                alert('Goodbye!')
                apiCall('/disconnect',{id})
              }} 
                style={LogOut}><span><img  src={require('./LogOff.png')}/></span>Log out</div>
          </Link>
          

          
        </div>
      </div>
    );
  }
}

export default Navbar;
const  main = {
    position: 'absolute',
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontFamily: 'Helvetica',
    width:'100%',
    height: 64,
    fontSize: 25,
    // padding: '0px 15px',
    color: 'white',
    boxShadow: '5px 2px 10px rgba(0,0,0,0.5)',
    backgroundColor: '#333'
    
}

  const Home = {
    fontSize: 20,
    display:'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderRight:'2px solid white'
}

const LeftSide = {
  textDecoration: 'none', 
  color:'white' ,
  borderLeft:'2px solid white'
}

const LogOut={
  padding: 15,
  borderLeft:'2px solid white'

}
