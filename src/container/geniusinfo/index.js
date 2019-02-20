import React, { Component } from 'react';
import {
  NavBar,
  Icon,
  InputItem,
  TextareaItem,
  WhiteSpace,
  Button,
} from 'antd-mobile';
import Avatar from '../../components/Avatar';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { update } from '../../redux/userReducer';

class GeniusInfo extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.selectAvatar = this.selectAvatar.bind(this);
    this.state = {
      position: '',
      desc: '',
    };
  }

  onChange(key, val) {
    this.setState({
      [key]: val,
    });
  }
  selectAvatar(text) {
    this.setState({
      avatar: text,
    });
  }
  render() {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect && redirect !== path ? (
          <Redirect to={this.props.redirectTo} />
        ) : null}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />,
          ]}
        >
          Genius Info
        </NavBar>
        <Avatar selectAvatar={this.selectAvatar} />
        <InputItem onChange={(v) => this.onChange('position', v)}>
          Position
        </InputItem>
        <TextareaItem
          onChange={(v) => this.onChange('desc', v)}
          rows={3}
          autoHeight
          title="Desc"
        />
        <WhiteSpace />

        <Button onClick={() => this.props.update(this.state)} type="primary">
          Save
        </Button>
      </div>
    );
  }
}

export default connect(
  (state) => state.user,
  { update },
)(GeniusInfo);
