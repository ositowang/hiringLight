import React, { Component } from 'react';
import Login from './container/login';
import Register from './container/register';
import { Route, Switch } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
import BossInfo from './container/bossinfo';
import GeniusInfo from './container/geniusinfo';
import Dashboard from './components/Dashboard';
import Home from './container/Home';
class App extends Component {
  render() {
    return (
      <div>
        <AuthRoute />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;
