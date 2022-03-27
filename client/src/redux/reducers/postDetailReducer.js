import { initiaPostDetail } from './initialState';
import { SHOW_POST, SHOW_WRITER } from '../actions/actions';

const postDetailReducer = (state = initiaPostDetail, action) => {
  switch (action.type) {
    case SHOW_POST:
      let post = action.payload;
      return Object.assign({}, state, {
        post: {
          address: post.address,
          category: post.category,
          content: post.content,
          currentMate: post.currentMate,
          date: post.date,
          id: post.id,
          image: post.image,
          market: post.market,
          region: post.region,
          status: post.status,
          time: post.time,
          title: post.title,
          totalMate: post.totalMate,
          tradeType: post.tradeType,
          url: post.url,
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
