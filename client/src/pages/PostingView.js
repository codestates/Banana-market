import React from "react";
import PostDetail from "../component/PostDetail";
import { useSelector, useDispatch } from "react-redux";
import { addToChatList } from "../redux/actions";

const PostingView = ({ chatListDetail, setChatListDetail }) => {
  // const state = useSelector((state) => state.postListReducer);
  // const { chatList } = state;
  // const dispatch = useDispatch();
  // const handleClick = (list) => {
  //   if (!chatList.map((el) => el.postId).includes(list.id)) {
  //     dispatch(addToChatList(list.id));
  //   }
  // };
  return (
    <div className="section">
      <PostDetail
      // chatListDetail={chatListDetail}
      // setChatListDetail={setChatListDetail}
      // handleClick={handleClick}
      ></PostDetail>
    </div>
  );
};

export default PostingView;
