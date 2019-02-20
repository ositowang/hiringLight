import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/userChat';
import UserCard from '../UserCard';
class Boss extends Component {
  componentDidMount() {
    this.props.getUserList('genius');
  }
  render() {
    return <UserCard userList={this.props.userList} />;
  }
}

export default connect(
  (state) => state.userChat,
  { getUserList },
)(Boss);
