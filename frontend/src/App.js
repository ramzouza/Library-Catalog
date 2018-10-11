import React, { Component } from 'react';
import './App.css';

import Login from './Login'
import Logged from './Logged'
import NewUser from './NewUser'
import LoggedUsers from './LoggedUsers'
import CreateResource from './CreateResource'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import cookie from 'react-cookies'
import { apiCall } from './ApiCall';

class App extends Component {

  componentWillMount(){
    const id = cookie.load('id')
    
    if(id) 
      apiCall('/connect', {id})
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.keepOnPage);
  }
  
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.keepOnPage);
  }
  
  keepOnPage(e) {
    e.returnValue = '';
    
    const id = cookie.load('id')
    
    console.log('id',id)
    if(id)
      apiCall('/disconnect', {id})
  }
  render() {
    return (
      <div style={main}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/" component={Logged} />
            <Route initial exact path="/newuser" component={NewUser} />
            <Route initial exact path="/create" component={CreateResource} />
            <Route exact path="/loggedusers" component={LoggedUsers} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
const main = {
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  fontFamily: 'Impact'
}