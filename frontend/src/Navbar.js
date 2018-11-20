import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom';
import cookie from 'react-cookies'
import { apiCall } from './ApiCall';
import { Glyphicon, MenuItem, DropdownButton, ButtonToolbar, Image, Dropdown, SplitButton } from 'react-bootstrap';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import './SideBar.css';


class Navbar extends Component {

    LogOut() {
        const id = cookie.load('id')
        cookie.remove('logged')
        cookie.remove('admin')
        cookie.remove('email')
        cookie.remove('id')
        cookie.remove('userCart')
        apiCall('/disconnect', { id })
        window.location.reload();
    }

    constructor() {
        super();
        this.state = {
            "notification": false
        }
    }



    render() {
        const logged = cookie.load('logged') === 'yes'
        const admin = cookie.load('admin') === 'yes'

        return (



            <div class='navbar-main' >
                {admin ? (
                    <SideNav
                        onSelect={(selected) => {

                        }}
                    >
                        <SideNav.Toggle />
                        <SideNav.Nav defaultSelected="home">

                            <NavItem eventKey="1" >

                                <NavIcon><Link to="/" >
                                    <i className="fa fa-fw fa-search" style={{ fontSize: '1.75em' }} /></Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }}>
                                    <Link to="/" >
                                        Home
            </Link>
                                </NavText>

                            </NavItem>

                            <NavItem eventKey="2" >
                                <NavIcon>
                                    <Link to="/loans" >
                                        <Glyphicon glyph='inbox' />
                                    </Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }} >
                                    <Link to="/loans" >
                                        Loans
                    </Link>
                                </NavText>
                            </NavItem>


                            <NavItem eventKey="3" >
                                <NavIcon>
                                    <Link to="/create/user" >
                                        <Glyphicon glyph='user' />
                                    </Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }} >
                                    <Link to="/create/user" >
                                        Create User
            </Link>
                                </NavText>
                            </NavItem>

                            <NavItem eventKey="4" >
                                <NavIcon>
                                    <Link to="/create" >
                                        <Glyphicon glyph='pencil' />
                                    </Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }}>
                                    <Link to="/create" >
                                        Create Resource
            </Link>
                                </NavText>
                            </NavItem>

                            <NavItem eventKey="5" >
                                <NavIcon>
                                    <Link to="/loggedusers" >
                                        <Glyphicon glyph='eye-open' />
                                    </Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }}>
                                    <Link to="/loggedusers" >
                                        View Logged Users
            </Link>
                                </NavText>
                            </NavItem>

                            <NavItem eventKey="6" >
                                <NavIcon>
                                    <Link to="/cart" >
                                        {this.state.notification ? <i class="fas fa-cart-plus notif" style={{ fontSize: '1.75em' }}></i> : <Glyphicon style={{ fontSize: '1.75em' }} glyph='shopping-cart' />}
                                    </Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }}>
                                    <Link to="/cart" >
                                        View Cart
            </Link>
                                </NavText>
                            </NavItem>

                            <NavItem eventKey="7" >
                                <NavIcon>
                                    <Link to="/Transactions" >
                                        <Glyphicon glyph='list-alt' />
                                    </Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }}>
                                    <Link to="/Transactions" >
                                        Transactions History
            </Link>
                                </NavText>
                            </NavItem>



                            <NavItem eventKey="8" onClick={this.LogOut}>
                                <NavIcon>
                                    <Link to="/" >
                                        <Glyphicon glyph='log-out' />
                                    </Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }}>
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
                                    <i className="fa fa-fw fa-search" style={{ fontSize: '1.75em' }} /></Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }}>
                                    <Link to="/" >
                                        Home
            </Link>
                                </NavText>
                            </NavItem>

                            <NavItem eventKey="2" >
                                <NavIcon>
                                    <Link to="/Loans" >
                                        <i class="fas fa-inbox"></i>
                                    </Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }} >
                                    <Link to="/Loans" >
                                        Loans
                    </Link>
                                </NavText>
                            </NavItem>


                            <NavItem eventKey="3" >
                                <NavIcon>
                                    <Link to="/cart" >
                                        <Glyphicon glyph='shopping-cart' />
                                    </Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }}>
                                    <Link to="/cart" >
                                        View Cart
            </Link>
                                </NavText>
                            </NavItem>

                            <NavItem eventKey="3" onClick={this.LogOut}>
                                <NavIcon>
                                    <Link to="/" >
                                        <Glyphicon glyph='log-out' />
                                    </Link>
                                </NavIcon>
                                <NavText style={{ fontSize: '1.2em' }}>
                                    <Link to="/" >
                                        Log Out
            </Link>
                                </NavText>
                            </NavItem>

                        </SideNav.Nav>
                    </SideNav>}

            </div>

        );
    }
}

export default Navbar;

