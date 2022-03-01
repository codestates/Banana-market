import { initialChatList } from './initialState';
import { ADD_TO_CHATLIST, SHOW_CHATLIST } from '../actions/actions';

const chatListReducer = (state = initialChatList, action) => {
  switch (action.type) {
    case SHOW_CHATLIST:
      let res = action.payload;
      return [...state, ...res];

    case ADD_TO_CHATLIST:
      let data = action.payload;
      return [...data, ...state];

    default:
      return state;
  }
};

export default chatListReducer;
