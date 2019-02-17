import React, { Component } from 'react';
import Login from './container/login';
import Register from './container/register';
import { Route } from 'react-router-dom';
import AuthRoute from './components/AuthRoute';
class App extends Component {
  render() {
    return (
      <div>
        <AuthRoute />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;
