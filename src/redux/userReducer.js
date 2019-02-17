import axios from 'axios';
import { getRedirectToPath } from '../utils/utils';

const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const ERROR_MSG = 'ERROR_MSG';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOAD_DATA = 'LOAD_DATA';

const initialState = {
  redirectTo: '',
  msg: '',
  isAuth: false,
  user: '',
  type: '',
};

//reducer
export function userReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectToPath(action.data),
        isAuth: true,
        ...action.data,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectToPath(action.data),
        isAuth: true,
      };
    case LOAD_DATA:
      return { ...state, ...action.data };
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
    default:
      return state;
  }
}

//actions creators sync
function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

function registerSuccess(data) {
  return { type: REGISTER_SUCCESS, data };
}

function loginSuccess(data) {
  return { type: LOGIN_SUCCESS, data };
}

//action creators async
export function register({ user, pwd, confirmPwd, type }) {
  if (!user || !pwd) {
    return errorMsg('Username and password are required');
  }
  if (pwd !== confirmPwd) {
    return errorMsg('Two password does not match');
  }
  return (dispatch) => {
    axios.post('./user/register', { user, pwd, type }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(registerSuccess({ user, pwd, type }));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function login({ user, pwd }) {
  if (!user || !pwd) {
    return errorMsg('Username and password are required');
  }

  return (dispatch) => {
    axios.post('/user/login', { user, pwd }).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(loginSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}

export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    data: userinfo,
  };
}
