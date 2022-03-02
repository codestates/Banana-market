import { initialChatList } from './initialState';
import { SHOW_CHATLIST, RESET_CHATLIST } from '../actions/actions';

const chatListReducer = (state = initialChatList, action) => {
  switch (action.type) {
    case SHOW_CHATLIST:
      let res = action.payload;
      return [...res, ...state];

    case RESET_CHATLIST:
      let data = [];
      return data;

    default:
      return state;
  }
};

export default chatListReducer;
