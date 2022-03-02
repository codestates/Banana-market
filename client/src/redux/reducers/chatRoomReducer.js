import { initialChatRoomList } from './initialState';
import {
  SHOW_CHATROOMLIST,
  SHOW_CHATROOMLIST_TITLE,
  SHOW_CHATROOMLIST_CONTENTS,
} from '../actions/actions';

const chatRoomReducer = (state = initialChatRoomList, action) => {
  switch (action.type) {
    // case SHOW_CHATROOMLIST:
    //   let res = action.payload;
    //   return Object.assign({}, state, {
    //     messageList: res.messageList,
    //     title: res.title,
    //   });

    case SHOW_CHATROOMLIST_TITLE:
      let chatTitle = action.payload;
      return Object.assign({}, state, {
        title: chatTitle,
      });
    case SHOW_CHATROOMLIST_CONTENTS:
      let contents = action.payload;
      return Object.assign({}, state, {
        messageList: [...state.messageList, ...contents],
      });

    default:
      return state;
  }
};

export default chatRoomReducer;
