import { initialList } from './initialState';
import { MY_POST_LIST, MY_POSTLIST_RESET } from '../actions/actions';

const myPostListReducer = (state = initialList, action) => {
  switch (action.type) {
    case MY_POST_LIST:
      let data = action.payload;
      return [...state, ...data];

    case MY_POSTLIST_RESET:
      let result = [];
      return result;

    default:
      return state;
  }
};

export default myPostListReducer;
