import { combineReducers } from 'redux';
import { userReducer } from './redux/userReducer';
import { userChatReducer } from './redux/userChat';
import { chatReducer } from './redux/chatReducer';

export default combineReducers({
  user: userReducer,
  userChat: userChatReducer,
  chat: chatReducer,
});
