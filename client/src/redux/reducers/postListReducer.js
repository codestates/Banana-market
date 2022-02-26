import { initialList } from './initialState';
import {
  SHOW_POSTDATA,
  SHOW_MORE_POSTLIST,
  POSTLIST_RESET,
  CATEGORY_LIST,
} from '../actions/actions';

const postListReducer = (state = initialList, action) => {
  switch (action.type) {
    // case SHOW_POSTDATA:
    //   let response = action.payload;
    //   return response;

    case SHOW_MORE_POSTLIST:
      let data = action.payload;
      return [...state, ...data];

    // case CATEGORY_LIST:

    case POSTLIST_RESET:
      let result = [];
      return result;

    default:
      return state;
  }
};

export default postListReducer;

//   switch (action.type) {
//     case ADD_TO_CHATLIST:
//       let found = state.findIndex((el) => {
//         return el.id === action.payload.id;
//       });
//       return Object.assign({}, state, {
//         chatList: [
//           ...state.chatList.slice(0, found),
//           action.payload,
//           ...state.chatList.slice(found + 1),
//         ],
//       });
//   }
