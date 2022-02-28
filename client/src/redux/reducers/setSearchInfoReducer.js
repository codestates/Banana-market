import { initialStateSearch } from './initialState';
import {
  SET_WORD_FOR_SEARCH,
  SET_RESULT_COUNT_NUM,
  SET_SEARCH_PAGE_NUM
} from '../actions/actions';

const setSearchListReducer = (state = initialStateSearch, action) => {
  switch (action.type) {
    case SET_WORD_FOR_SEARCH:
      let data = action.payload;
      return Object.assign({}, state, {
        searchWord: data,
      });
    case SET_RESULT_COUNT_NUM:
      let result = action.payload;
      return Object.assign({}, state, {
        searchCount: result,
      });
    case SET_SEARCH_PAGE_NUM:
      let num = action.payload;
      return Object.assign({}, state, {
        searchPageNum: num,
      });
    default:
      return state;
  }
};

export default setSearchListReducer;