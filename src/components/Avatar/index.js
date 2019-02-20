import React, { Component } from 'react';
import { Grid, List } from 'antd-mobile';
import PropTypes from 'prop-types';

export default class Avatar extends Component {
  static propTypes = {
    selectAvatar: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map((v) => ({
        icon: require(`../../assets/avatarImg/${v}.png`),
        text: v,
      }));
    const gridHeader = this.state.icon ? (
      <div>
        <span>Selected: </span>
        <img
          style={{ width: 20, marginLeft: 8 }}
          src={this.state.icon}
          alt=""
        />
      </div>
    ) : (
      'Please Select'
    );
    return (
      <div>
        <List renderHeader={() => gridHeader}>
          <Grid
            data={avatarList}
            columnNum={5}
            onClick={(elem) => {
              this.setState(elem);
              this.props.selectAvatar(elem.text);
            }}
          />
        </List>
      </div>
    );
  }
}
