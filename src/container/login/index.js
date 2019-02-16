import React, { Component } from 'react';
import Logo from '../../components/Logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';

export default class Login extends Component {
  render() {
    return (
      <div>
        <Logo />
        <WingBlank>
          <Button type="primary">Login</Button>
          <WhiteSpace />
          <Button type="primary">Register</Button>
        </WingBlank>
      </div>
    );
  }
}
