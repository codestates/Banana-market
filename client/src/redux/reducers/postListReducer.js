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

    case POSTLIST_RESET:
      let result = [];
      return result;

    default:
      return state;
  }
};

export default postListReducer;
