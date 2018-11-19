import React, { Component } from 'react';
import './style.css';

import Login from './Login'
import Logged from './Logged'
import NewUser from './NewUser'
import LoggedUsers from './LoggedUsers'
import CreateResource from './CreateResource'
import CreateBook from './CreateBook'
import CreateMagazine from './CreateMagazine'
import CreateMovie from './CreateMovie'
import CreateMusic from './CreateMusic'
import Transactions from './Transactions'
import Cart from './Cart'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import cookie from 'react-cookies'
import { apiCall } from './ApiCall';
import Loans from './Loans';
class App extends Component {

  componentWillMount() {
    const id = cookie.load('id')

    if (id)
      apiCall('/connect', { id })
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

    console.log('id', id)
    if (id)
      apiCall('/disconnect', { id })
  }

  render() {
    return (
      <div class="app-main">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route initial exact path="/" component={Logged} />
            <Route exact path="/create/user" component={NewUser} />
            <Route exact path="/create" component={CreateResource} />
            <Route exact path="/create/book" component={CreateBook} />
            <Route exact path="/create/magazine" component={CreateMagazine} />
            <Route exact path="/create/movie" component={CreateMovie} />
            <Route exact path="/create/music" component={CreateMusic} />
            <Route exact path="/loggedusers" component={LoggedUsers} />
            <Route exact path="/transactions" component={Transactions} />
            <Route exact path="/loans" component={Loans} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
