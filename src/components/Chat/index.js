import React, { Component } from 'react';
import { InputItem, List, NavBar, Grid } from 'antd-mobile';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, receiveMsg } from '../../redux/chatReducer';
import './style.css';
import { getChatId } from '../../utils/utils';

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
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  handleSend() {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({ from, to, msg });
    this.setState({
      text: '',
      showEmoji: false,
    });
  }
  fixCarousel() {
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }
  render() {
    const emoji = '😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😌 😍 😗 😘 😜 🤪 😞 😟 😭 😡 👐 🕵 🕵️‍ 👩‍⚕️ 😈 👿 👹 👺 🤡 💩 👻 💀 ☠ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 😿 🤲 🙌 👏 🤝 👎 ✊ 🤛 🤜 🤞 ✌ 🤟 🤘 👌 👉 👉 👆 👇 ✋ 👧 🧒 👦 👩 👨'
      .split(' ')
      .filter((v) => v)
      .map((v) => ({ text: v }));
    const userId = this.props.match.params.user;
    const users = this.props.chat.users;
    const chatId = getChatId(this.props.user._id, userId);
    const chatMsg = this.props.chat.chatMsg.filter((v) => v.chatId === chatId);
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
        {chatMsg.map((v) => {
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
              extra={
                <div>
                  <span
                    role="img"
                    aria-label="emoji"
                    style={{ marginRight: 6 }}
                    onClick={() => {
                      this.setState({
                        showEmoji: true,
                      });
                      this.fixCarousel();
                    }}
                  >
                    😃
                  </span>
                  <span onClick={() => this.handleSend()}>Send</span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji ? (
            <Grid
              data={emoji}
              columnNum={9}
              isCarousel={true}
              carouselMaxRow={3}
              onClick={(el) => {
                this.setState({
                  text: this.state.text + el.text,
                });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state,
  { getMsgList, sendMsg, receiveMsg },
)(Chat);
