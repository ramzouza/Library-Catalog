import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Glyphicon } from 'react-bootstrap'
import HeaderMenu from './HeaderMenu'



class Header extends Component {

    render() {

        let image ='./Home.png'
        return (
          <div className="navbar-main">
          
            <h1>
              <Link to='/' style={{ textDecoration: 'none', color: "#E27A3F" }}>
                <img src={image} alt="The Loan Zone" width={30} />&nbsp;The Loan Zone<small></small>
              </Link>
            </h1>
    
              <div className ="menu">
              
                   <Glyphicon glyph="thumbnails-small" />
                   
              </div>  
    
          </div>
        );
      }
    }
    
    
    
    export default Header;