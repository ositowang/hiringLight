import React, { Component } from 'react';
import { InputItem, List, NavBar } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, receiveMsg } from '../../redux/chatReducer';
import './style.css';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      msg: [],
    };
  }
  componentDidMount() {
    if (this.props.chat.chatMsg.length === 0) {
      this.props.getMsgList();
      this.props.receiveMsg();
    }
  }

  handleSend() {
    // socket.emit('sendMsg', { text: this.state.text });
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({
      text: '',
    });
  }
  render() {
    const userId = this.props.match.params.user;
    const users = this.props.chat.users;
    //if we did not get user for any reason,don't show
    if (!users[userId]) {
      return null;
    }
    return (
      <div id="chat-page">
        <NavBar
          mode="dark"
          leftContent="Back"
          onLeftClick={() => {
            this.props.history.goBack();
          }}
        >
          {users[userId].name}
        </NavBar>
        {this.props.chat.chatMsg.map((v) => {
          const avatar = require(`../../assets/avatarImg/${
            users[v.from].avatar
          }.png`);
          return userId === v.from ? (
            <List key={v._id}>
              <List.Item thumb={avatar}>They send:{v.content}</List.Item>
            </List>
          ) : (
            <List key={v._id}>
              <List.Item
                extra={<img src={avatar} alt="avatar" />}
                className="chat-me"
              >
                I send: {v.content}
              </List.Item>
            </List>
          );
        })}
        <div className="sticky-footer">
          <List>
            <InputItem
              placeholder="Please type"
              value={this.state.text}
              onChange={(v) => {
                this.setState({
                  text: v,
                });
              }}
              extra={<span onClick={() => this.handleSend()}>Send</span>}
            />
          </List>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  { getMsgList, sendMsg, receiveMsg },
)(Chat);
