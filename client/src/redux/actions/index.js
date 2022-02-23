import axios from "axios";

export const SHOW_POSTLIST = "SHOW_POSTLIST";
export const SHOW_POSTDETAIL = "SHOW_POSTDETAIL";
export const ADD_TO_CHATLIST = "ADD_TO_CHATLIST";

// export const showPostList = () => async (dispatch) => {
//   try {
//     const res = await axios.get("http://localhost:3001/articles/lists");
//     dispatch({
//       type: SHOW_POSTLIST,
//       payload: res.data.articleList,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
export const showPostList = (products) => {
  return {
    type: SHOW_POSTLIST,
    payload: products,
  };
};
// export const showPostDetail = (postId) => {
//     return {
//       type: ADD_TO_CHATLIST,
//       payload: {
//         postId,
//       },
//     };
//   };
//   export const addToChatList = (postId) => {
//     return {
//       type: ADD_TO_CHATLIST,
//       payload: {
//         postId,
//       },
//     };
//   };
