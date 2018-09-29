import React, { Component } from 'react';
import './App.css';

import Login from './Login'
import Logged from './Logged'
import NewUser from './NewUser'
import LoggedUsers from './LoggedUsers'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  componentDidMount() {
    window.addEventListener('beforeunload', this.keepOnPage);
  }
  
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.keepOnPage);
  }
  
  keepOnPage(e) {
    // e.returnValue = '';
  }
  render() {
    return (
      <div style={main}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/" component={Logged} />
            <Route initial exact path="/newuser" component={NewUser} />
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