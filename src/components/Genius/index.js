import React, { Component } from 'react';
import UserCard from '../UserCard';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/userChat';

class Genius extends Component {
  componentDidMount() {
    this.props.getUserList('boss');
  }
  render() {
    return <UserCard userList={this.props.userList} />;
  }
}

export default connect(
  (state) => state.userChat,
  { getUserList },
)(Genius);
