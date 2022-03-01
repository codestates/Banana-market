import { initialList } from './initialState';
import {
  SHOW_SEARCH_POSTDATA,
  SHOW_MORE_SEARCH_POSTLIST,
  SEARCH_POSTLIST_RESET,
} from '../actions/actions';

const initialStateSearchList = (state = initialList, action) => {
  switch (action.type) {
    case SHOW_MORE_SEARCH_POSTLIST:
      let data = action.payload;
      return [...state, ...data];
    case SEARCH_POSTLIST_RESET:
      let result = [];
      return result;
    default:
      return state;
  }
};

export default initialStateSearchList;
