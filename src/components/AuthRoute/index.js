import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/userReducer';
import { connect } from 'react-redux';

class AuthRoute extends Component {
  componentDidMount() {
    const checkList = ['/login', '/register'];
    const pathName = this.props.location.pathname;
    if (checkList.indexOf(pathName) > -1) {
      return;
    }
    //get the user info: whether login or not,user type,information complete?
    axios.get('/user/info').then((res) => {
      if (res.status === 200) {
        //with login authentication
        if (res.data.code === 0) {
          this.props.loadData(res.data.data);
        } else {
          this.props.history.push('./login');
        }
      }
    });
  }
  render() {
    return <div />;
  }
}

export default withRouter(
  connect(
    (state) => state.user,
    { loadData },
  )(AuthRoute),
);
