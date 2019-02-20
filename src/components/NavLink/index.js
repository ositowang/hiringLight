import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TabBar } from 'antd-mobile';
import { withRouter } from 'react-router-dom';

class NavLink extends Component {
  static propTypes = {
    data: PropTypes.array,
  };
  render() {
    const navList = this.props.data.filter((v) => !v.hide);
    const { pathname } = this.props.location;
    return (
      <TabBar>
        {navList.map((v) => (
          <TabBar.Item
            key={v.path}
            title={v.text}
            icon={{ uri: require(`../../assets/navLinkImg/${v.icon}.png`) }}
            selectedIcon={{
              uri: require(`../../assets/navLinkImg/${v.icon}-active.png`),
            }}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.push(v.path);
            }}
          />
        ))}
      </TabBar>
    );
  }
}

export default withRouter(NavLink);
