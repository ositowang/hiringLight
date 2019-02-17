import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Logo from '../../components/Logo';
import { List, InputItem, Radio, WhiteSpace, Button } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from '../../redux/userReducer';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'genius',
      user: '',
      pwd: '',
      confirmPwd: '',
      redirectTo: '',
    };
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister() {
    this.props.register(this.state);
    console.log(this.state);
  }
  handleChange(key, value) {
    this.setState({
      [key]: value,
    });
  }
  render() {
    const RadioItem = Radio.RadioItem;
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo />
        {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
        <List renderHeader={() => 'User Account'}>
          <InputItem
            onChange={(v) => this.handleChange('user', v)}
            placeholder="Enter your username"
          >
            Username
          </InputItem>
          <InputItem
            onChange={(v) => this.handleChange('pwd', v)}
            type="password"
            placeholder="****"
          >
            Password
          </InputItem>
          <InputItem
            onChange={(v) => this.handleChange('confirmPwd', v)}
            type="password"
            placeholder="****"
          >
            Confirm
          </InputItem>
        </List>
        <List renderHeader={() => 'User Type'}>
          <RadioItem
            onChange={() => this.handleChange('type', 'genius')}
            checked={this.state.type === 'genius'}
          >
            Genius
          </RadioItem>
          <RadioItem
            onChange={() => this.handleChange('type', 'boss')}
            checked={this.state.type === 'boss'}
          >
            Boss
          </RadioItem>
        </List>
        <WhiteSpace />
        <Button onClick={this.handleRegister} type="primary">
          Register
        </Button>
      </div>
    );
  }
}

export default connect(
  (state) => state.user,
  { register },
)(Register);
