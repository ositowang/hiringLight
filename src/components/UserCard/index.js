import React from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class UserCard extends React.Component {
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`);
  }
  render() {
    return (
      <WingBlank>
        <WhiteSpace />
        {this.props.userList.map((v) =>
          v.avatar ? (
            <div key={v._id}>
              <Card onClick={() => this.handleClick(v)}>
                <Card.Header
                  title={v.user}
                  thumb={require(`../../assets/avatarImg/${v.avatar}.png`)}
                  extra={<span>{v.position}</span>}
                />
                <Card.Body>
                  {v.desc.split('\n').map((item) => {
                    return <div key={item}>{item}</div>;
                  })}
                  {v.type === 'boss' ? <div>Salary: {v.salary}</div> : null}
                </Card.Body>
              </Card>
              <WhiteSpace />
            </div>
          ) : null,
        )}
      </WingBlank>
    );
  }
}
UserCard.propTypes = {
  userList: PropTypes.array.isRequired,
};
export default withRouter(UserCard);
