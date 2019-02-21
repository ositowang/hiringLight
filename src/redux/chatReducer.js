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
        unread: action.msg.filter((v) => !v.read && v.from !== action.userId)
          .length,
        users: action.users,
      };
    case MSG_RECEIVE:
      const n = action.data.from !== action.userId ? 1 : 0;
      return {
        ...state,
        chatMsg: [...state.chatMsg, action.data],
        unread: state.unread + n,
      };
    // case MSG_READ:
    default:
      return state;
  }
}

function msgList(msg, users, userId) {
  return { type: MSG_LIST, msg, users, userId };
}

function msgReceive(data, userId) {
  return { type: MSG_RECEIVE, data, userId };
}

export function getMsgList() {
  return (dispatch, getState) => {
    axios.get('/user/getMsgList').then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        const userId = getState().user._id;
        dispatch(msgList(res.data.msg, res.data.users, userId));
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
  return (dispatch, getState) => {
    const userId = getState().user._id;
    socket.on('receive', function(data) {
      dispatch(msgReceive(data, userId));
    });
  };
}
