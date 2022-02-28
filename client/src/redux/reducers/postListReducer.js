import { initialList } from './initialState';
import {
  SHOW_MORE_POSTLIST,
  POSTLIST_RESET,
  REMOVE_FROM_LIST,
} from '../actions/actions';

const postListReducer = (state = initialList, action) => {
  switch (action.type) {
    case SHOW_MORE_POSTLIST:
      let data = action.payload;
      return [...state, ...data];

    case REMOVE_FROM_LIST:

    case POSTLIST_RESET:
      let result = [];
      return result;

    //TODO
    // let found = state.cartItems.findIndex(el => el.itemId !== action.payload.itemId)
    // return Object.assign({}, state, {
    //   cartItems: state.cartItems.filter(el => el.itemId !== action.payload.itemId)
    // })

    default:
      return state;
  }
};

export default postListReducer;
