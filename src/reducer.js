import { combineReducers } from 'redux';
import { userReducer } from './redux/userReducer';
import { userChatReducer } from './redux/userChat';

export default combineReducers({
  user: userReducer,
  userChat: userChatReducer,
});
