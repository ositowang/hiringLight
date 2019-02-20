import React from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';

UserCard.propTypes = {
  userList: PropTypes.array.isRequired,
};

export default function UserCard(props) {
  return (
    <WingBlank>
      <WhiteSpace />
      {props.userList.map((v) =>
        v.avatar ? (
          <div key={v._id}>
            <Card>
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
