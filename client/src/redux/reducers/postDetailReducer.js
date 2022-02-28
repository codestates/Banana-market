import { initiaPostDetail } from './initialState';
import { SHOW_POST, SHOW_WRITER } from '../actions/actions';

const postDetailReducer = (state = initiaPostDetail, action) => {
  switch (action.type) {
    case SHOW_POST:
      let post = action.payload;
      return Object.assign({}, state, {
        post: {
          id: post.id,
          title: post.title,
          image: post.image,
          content: post.content,
          category: post.category,
          market: post.market,
          region: post.region,
          date: post.date,
          time: post.time,
          totalMate: post.totalMate,
          currentMate: post.currentMate,
          status: post.status,
          tradeType: post.tradeType,
        },
      });

    case SHOW_WRITER:
      let postWriter = action.payload;
      return Object.assign({}, state, {
        postWriter: {
          userId: postWriter.userId,
          isMyPost: postWriter.isMyPost,
          name: postWriter.name,
          profile_image: postWriter.profile_image,
          region: postWriter.region,
          totalTrade: postWriter.totalTrade,
        },
      });

    default:
      return state;
  }
};

export default postDetailReducer;
