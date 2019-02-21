import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Badge } from 'antd-mobile';

class Message extends Component {
  render() {
    const msgGroup = {};
    const Item = List.Item;
    const Brief = Item.Brief;
    this.props.chat.chatMsg.forEach((v) => {
      msgGroup[v.chatId] = msgGroup[v.chatId] || [];
      msgGroup[v.chatId].push(v);
    });
    const chatList = Object.values(msgGroup).sort((a, b) => {
      const aLastTime = a[a.length - 1].createTime;
      const bLastTime = b[b.length - 1].createTime;
      console.log(aLastTime + ' : ' + bLastTime);
      return bLastTime - aLastTime;
    });
    return (
      <div>
        {chatList.map((v) => {
          const lastItem = v[v.length - 1];
          const targetId =
            v[0].from === this.props.user._id ? v[0].to : v[0].from;
          if (!this.props.chat.users[targetId]) {
            return null;
          }
          const userName = this.props.chat.users[targetId].name
            ? this.props.chat.users[targetId].name
            : '';

          const unreadNum = v.filter(
            (v) => !v.read && v.to === this.props.user._id,
          ).length;
          return (
            <List key={lastItem._id}>
              <Item
                extra={<Badge text={unreadNum} />}
                thumb={require(`../../assets/avatarImg/${
                  this.props.chat.users[targetId].avatar
                }.png`)}
                arrow="horizontal"
                onClick={() => {
                  this.props.history.push(`/chat/${targetId}`);
                }}
              >
                {lastItem.content}
                <Brief>{userName}</Brief>
              </Item>
            </List>
          );
        })}
      </div>
    );
  }
}
export default connect(
  (state) => state,
  null,
)(Message);
