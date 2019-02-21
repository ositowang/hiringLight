import axios from 'axios';
import { getRedirectToPath } from '../utils/utils';

const ERROR_MSG = 'ERROR_MSG';
const LOAD_DATA = 'LOAD_DATA';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const LOGOUT = 'LOGOUT';
const initialState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: '',
};

//reducer
export function userReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        msg: '',
        redirectTo: getRedirectToPath(action.data),
        ...action.data,
      };
    case LOAD_DATA:
      return { ...state, ...action.data };
    case ERROR_MSG:
      return { ...state, isAuth: false, msg: action.msg };
    case LOGOUT:
      return { ...initialState, redirectTo: '/login' };
    default:
      return state;
  }
}

//actions creators sync
function errorMsg(msg) {
  return { msg, type: ERROR_MSG };
}

function authSuccess(data) {
  return {
    type: AUTH_SUCCESS,
    data,
  };
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
        dispatch(authSuccess({ user, pwd, type }));
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
        dispatch(authSuccess(res.data.data));
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

export function logoutSubmit() {
  return { type: LOGOUT };
}

export function update(data) {
  return (dispatch) => {
    axios.post('user/update', data).then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data));
      } else {
        dispatch(errorMsg(res.data.msg));
      }
    });
  };
}
