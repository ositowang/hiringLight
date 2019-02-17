import React, { Component } from 'react';
import Logo from '../../components/Logo';
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile';
import { login } from '../../redux/userReducer';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: '',
    };
    this.register = this.register.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  register() {
    this.props.history.push('./register');
  }

  handleLogin() {
    this.props.login(this.state);
  }
  handleChange(key, value) {
    this.setState({
      [key]: value,
    });
  }
  render() {
    return (
      <div>
        <Logo />
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <WingBlank>
          {this.props.msg ? (
            <p className="error-msg">{this.props.msg}</p>
          ) : null}
          <List>
            <InputItem onChange={(v) => this.handleChange('user', v)}>
              User
            </InputItem>
            <WhiteSpace />
            <InputItem
              onChange={(v) => this.handleChange('pwd', v)}
              type="password"
              placeholder="****"
            >
              Password
            </InputItem>
          </List>
          <WhiteSpace />
          <Button onClick={this.handleLogin} type="primary">
            Login
          </Button>
          <WhiteSpace />
          <Button onClick={this.register} type="primary">
            Register
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default connect(
  (state) => state.user,
  { login },
)(Login);
