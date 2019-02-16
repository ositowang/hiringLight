import { combineReducers } from 'redux';

const initialState = {
  test: 'test',
};

const testReducer = (state = initialState, action) => {
  return state;
};

export default combineReducers({ test: testReducer });
