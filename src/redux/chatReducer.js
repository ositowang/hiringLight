import axios from 'axios';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

const MSG_LIST = 'MSG_LIST';
const MSG_RECEIVE = 'MSG_RECEIVE';
const MSG_READ = 'MSG_READ';

const initialState = {
  chatMsg: [],
  unread: 0,
  users: {},
};

export function chatReducer(state = initialState, action) {
  switch (action.type) {
    case MSG_LIST:
      return {
        ...state,
        chatMsg: action.msg,
        unread: action.msg.filter((v) => !v.read).length,
        users: action.users,
      };
    case MSG_RECEIVE:
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.data],
        unread: state.unread + 1,
      };
    // case MSG_READ:
    default:
      return state;
  }
}

function msgList(msg, users) {
  return { type: MSG_LIST, msg, users };
}

function msgReceive(data) {
  return { type: MSG_RECEIVE, data };
}

export function getMsgList() {
  return (dispatch) => {
    axios.get('/user/getMsgList').then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(msgList(res.data.msg, res.data.users));
      }
    });
  };
}

export function sendMsg({ from, to, msg }) {
  return (dispatch) => {
    socket.emit('sendMsg', { from, to, msg });
  };
}

export function receiveMsg() {
  return (dispatch) => {
    socket.on('receive', function(data) {
      dispatch(msgReceive(data));
    });
  };
}
