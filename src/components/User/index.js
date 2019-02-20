import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Result, List, Button, WhiteSpace, Modal } from 'antd-mobile';
import browserCookie from 'browser-cookies';

import { Redirect } from 'react-router-dom';
import { logoutSubmit } from '../../redux/userReducer';
import { Brief } from 'antd-mobile/lib/list/ListItem';

class User extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    const alert = Modal.alert;
    console.log('log out');
    alert('Log Out', 'Are you sure???', [
      { text: 'Cancel', onPress: () => console.log('cancel') },
      {
        text: 'Confirm',
        onPress: () => {
          browserCookie.erase('userid');
          this.props.logoutSubmit();
        },
      },
    ]);
  }
  render() {
    return this.props.user ? (
      <div>
        <Result
          img={
            <img
              src={require(`../../assets/avatarImg/${this.props.avatar}.png`)}
              style={{ width: 40 }}
              alt="userAvatar"
            />
          }
          title={this.props.user}
          message={this.props.type === 'boss' ? this.props.company : null}
        />
        <List renderHeader={() => 'Description'}>
          <List.Item>
            {this.props.position}
            {this.props.desc.split('\n').map((v) => (
              <Brief key={v}>v</Brief>
            ))}
            {this.props.salary ? <Brief>{this.props.salary}</Brief> : null}
          </List.Item>
          <WhiteSpace />
        </List>
        <Button onClick={this.handleLogout} type="primary">
          Log Out
        </Button>
      </div>
    ) : (
      <Redirect to={this.props.redirectTo} />
    );
  }
}

export default connect(
  (state) => state.user,
  { logoutSubmit },
)(User);
