import { initialList } from './initialState';
import { SHOW_POSTLIST, SHOW_MORE_POSTLIST } from '../actions/actions';

const postListReducer = (state = initialList, action) => {
  switch (action.type) {
    case SHOW_POSTLIST:
      let response = action.payload;
      return response;

    case SHOW_MORE_POSTLIST:
      let data = action.payload;
      return [...state, ...data];
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
