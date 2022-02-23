import { SHOW_POSTLIST } from "../actions/index";

const initialState = {
  chatList: [],
};

const postListReducer = (state = initialState, action) => {
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
  switch (action.type) {
    case SHOW_POSTLIST:
      return {
        ...state,
        chatList: action.payload,
      };
    default:
      return state;
  }
};

export default postListReducer;
