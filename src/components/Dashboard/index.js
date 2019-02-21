import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLink from '../NavLink';
import Boss from '../Boss';
import Genius from '../Genius';
import User from '../User';
import Message from '../Message'
import { getMsgList, receiveMsg } from '../../redux/chatReducer';
function Msg() {
  return <div>Msg</div>;
}
class Dashboard extends Component {
  componentDidMount() {
    if (this.props.chat.chatMsg.length === 0) {
      this.props.getMsgList();
      this.props.receiveMsg();
    }
  }
  render() {
    const { pathname } = this.props.location;
    const user = this.props.user;
    const navList = [
      {
        path: '/boss',
        text: 'Genius',
        icon: 'boss',
        title: 'Genius List',
        component: Boss,
        hide: user.type === 'genius',
      },
      {
        path: '/genius',
        text: 'Boss',
        icon: 'job',
        title: 'Boss List',
        component: Genius,
        hide: user.type === 'boss',
      },
      {
        path: '/msg',
        text: 'Msg',
        icon: 'msg',
        title: 'Message',
        component: Message,
      },
      {
        path: '/me',
        text: 'Me',
        icon: 'user',
        title: 'Me',
        component: User,
      },
    ];
    // debugger;
    return (
      <div>
        <NavBar mode="dark">
          {navList.find((v) => v.path === pathname).title}
        </NavBar>
        <Switch>
          {navList.map((item) => {
            return (
              <Route
                key={item.path}
                path={item.path}
                component={item.component}
              />
            );
          })}
        </Switch>
        <NavLink data={navList} />
      </div>
    );
  }
}

export default connect(
  (state) => state,
  { getMsgList, receiveMsg },
)(Dashboard);
