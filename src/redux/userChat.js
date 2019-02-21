import axios from 'axios';

const USER_LIST = 'USER_LIST';

const initialState = {
  userList: [],
};

function userChatReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LIST:
      return { ...state, userList: action.data };
    default:
      return state;
  }
}

//action creators

function userList(data) {
  return { type: USER_LIST, data };
}

function getUserList(type) {
  return (dispatch) => {
    axios.get('/user/list?type=' + type).then((res) => {
      if (res.data.code === 0 && res.status === 200) {
        dispatch(userList(res.data.data));
      }
    });
  };
}

export { userChatReducer, getUserList };
