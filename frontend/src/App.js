import React, { Component } from 'react';
import './App.css';

import Login from './Login'
import Logged from './Logged'
import NewUser from './NewUser'
import LoggedUsers from './LoggedUsers'
import cookie from 'react-cookies'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

  constructor(props){
    super(props)

  }
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
    const logged = cookie.load('logged') == 'yes'
    return (
      <div style={main}>
        <Router>
          <Switch>
            {!logged?<Route exact path="/login" component={Login}/>: null }
            <Route exact path="/" component={Logged} />
            {logged?<Route initial exact path="/newuser" component={NewUser} />: null }
            {logged?<Route exact path="/loggedusers" component={LoggedUsers} />: null}
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