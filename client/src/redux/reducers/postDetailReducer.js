import { initiaListDetail } from './initialState';
import { SHOW_POSTDETAIL, SHOW_MY_POSTDETAIL } from '../actions/actions';
postListReducer;

const postListReducer = (state = initialList, action) => {
  switch (action.type) {
    case SHOW_POSTDETAIL:
      let response = action.payload;
      let result = {
        id: response.id,
        title: response.title,
        image: response.image,
        content: response.content,
        category: response.category,
        market: response.market,
        region: response.region,
        date: response.date,
        time: response.time,
        totalMate: response.totalMate,
        currentMate: response.currentMate,
        status: response.status,
        tradeType: response.tradeType,
      };
      return result;
    // case SHOW_POSTDETAIL:

    case SHOW_MY_POSTDETAIL:
      return Object.assign({}, state, {
        id: response.id,
        title: response.title,
        image: response.image,
        content: response.content,
        category: response.category,
        market: response.market,
        region: response.region,
        date: response.date,
        time: response.time,
        totalMate: response.totalMate,
        currentMate: response.currentMate,
        status: response.status,
        tradeType: response.tradeType,
      });
    //   let response = action.payload;
    default:
      return state;
  }
};
