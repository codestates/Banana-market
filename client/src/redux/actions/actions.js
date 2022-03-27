import { createAction } from 'redux-action';
// Action은 말 그대로 어떤 액션을 취할 것인지 정의해 놓은 객체

// ---------------setLoginReducer--------------
// action types : reducer.js와 actions.js 에서 공통으로 사용하므로 변수로 선언함.
export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOGOUT = 'SET_LOGOUT';
// actions creator functions
export const setLogin = () => ({ type: SET_LOGIN });
export const setLogout = () => ({ type: SET_LOGOUT });

// ---------------setAdminLoginReducer--------------
export const SET_ADMIN_LOGIN = 'SET_ADMIN_LOGIN';
export const SET_ADMIN_LOGOUT = 'SET_ADMIN_LOGOUT';

export const setAdminLogin = () => ({ type: SET_ADMIN_LOGIN });
export const setAdminLogout = () => ({ type: SET_ADMIN_LOGOUT });

// ---------------setUserInfoReducer--------------
export const SET_UPDATE_USER_INFO = 'SET_UPDATE_USER_INFO';
export const SET_USER_INFO_NULL = 'SET_USER_INFO_NULL';
export const SET_USER_INFO_NICKNAME = 'SET_USER_INFO_NICKNAME';
export const SET_USER_INFO_REGION = 'SET_USER_INFO_REGION';
export const SET_USER_INFO_PROFILE_IMG_NULL = 'SET_USER_INFO_PROFILE_IMG_NULL';

export const setUpdateUserInfo = (payload) => ({
  type: SET_UPDATE_USER_INFO,
  payload,
});
export const setUserInfoNull = () => ({ type: SET_USER_INFO_NULL });
export const setUserInfoNickName = (payload) => ({
  type: SET_USER_INFO_NICKNAME,
  payload,
});
export const setUserInfoRegion = (payload) => ({
  type: SET_USER_INFO_REGION,
  payload,
});

export const setUserInfoProfileImgNull = (payload) => ({
  type: SET_USER_INFO_PROFILE_IMG_NULL,
});

// ---------------searchInfoReducer-----------------
export const SET_WORD_FOR_SEARCH = 'SET_WORD_FOR_SEARCH';
export const SET_RESULT_COUNT_NUM = 'SET_RESULT_COUNT_NUM';
export const SET_SEARCH_PAGE_NUM = 'SET_SEARCH_PAGE_NUM';

export const setWordForSearch = (payload) => {
  return {
    type: SET_WORD_FOR_SEARCH,
    payload,
  };
};
export const setResultCountNum = (payload) => {
  return {
    type: SET_RESULT_COUNT_NUM,
    payload,
  };
};
export const setSearchPageNum = (payload) => {
  return {
    type: SET_SEARCH_PAGE_NUM,
    payload,
  };
};

// ---------------searchListReducer-----------------
export const SHOW_SEARCH_POSTDATA = 'SHOW_SEARCH_POSTDATA';
export const SHOW_MORE_SEARCH_POSTLIST = 'SHOW_MORE_SEARCH_POSTLIST';
export const SEARCH_POSTLIST_RESET = 'SEARCH_POSTLIST_RESET';

export const showSearchPostData = (payload) => {
  return {
    type: SHOW_SEARCH_POSTDATA,
    payload,
  };
};
export const showMoreSearchPostList = (payload) => {
  return {
    type: SHOW_MORE_SEARCH_POSTLIST,
    payload,
  };
};
export const searchPostListReset = (payload) => {
  return {
    type: SEARCH_POSTLIST_RESET,
    payload,
  };
};

// ---------------postListReducer-----------------
export const SHOW_MORE_POSTLIST = 'SHOW_MORE_POSTLIST';
export const POSTLIST_RESET = 'POSTLIST_RESET';
export const REMOVE_FROM_LIST = 'REMOVE_FROM_LIST';

export const showMorePostList = (payload) => {
  return {
    type: SHOW_MORE_POSTLIST,
    payload,
  };
};

export const postListReset = (payload) => {
  return {
    type: POSTLIST_RESET,
    payload,
  };
};
export const postListDelete = (payload) => {
  return {
    type: REMOVE_FROM_LIST,
    payload,
  };
};

// ---------------postDetailReducer-----------------
export const SHOW_POST = 'SHOW_POST';
export const SHOW_WRITER = 'SHOW_WRITER';

export const showPostDetail = (payload) => {
  return {
    type: SHOW_POST,
    payload,
  };
};
export const showMyPostDetail = (payload) => {
  return {
    type: SHOW_WRITER,
    payload,
  };
};
// --------------categoryReducer----------------
export const CATEGORY_DATA = 'CATEGORY_DATA';

export const categoryData = (payload) => {
  return {
    type: CATEGORY_DATA,
    payload,
  };
};

// --------------myPostListReducer----------------

export const MY_POST_LIST = 'MY_POST_LIST';
export const MY_POSTLIST_RESET = 'MY_POSTLIST_RESET';

export const myPostListData = (payload) => {
  return {
    type: MY_POST_LIST,
    payload,
  };
};

export const myPostListReset = (payload) => {
  return {
    type: MY_POSTLIST_RESET,
    payload,
  };
};

// --------------chatListReducer--------------------
export const RESET_CHATLIST = 'RESET_CHATLIST';
export const SHOW_CHATLIST = 'SHOW_CHATLIST';

export const ResetChatList = (payload) => {
  return {
    type: RESET_CHATLIST,
    payload,
  };
};

export const ShowChatList = (payload) => {
  return {
    type: SHOW_CHATLIST,
    payload,
  };
};

// --------------setMessageReducer--------------------
export const RESET_MESSAGE = 'RESET_MESSAGE';
export const SHOW_MESSAGE = 'SHOW_MESSAGE';
export const ADD_MESSAGE = 'ADD_MESSAGE';

export const ResetMessage = (payload) => {
  return {
    type: RESET_MESSAGE,
    payload,
  };
};

export const ShowMessage = (payload) => {
  return {
    type: SHOW_MESSAGE,
    payload,
  };
};

export const AddMessage = (payload) => {
  return {
    type: ADD_MESSAGE,
    payload,
  };
};

// --------------setSocketMessageReducer--------------------
export const RESET_SOCKET_MESSAGE = 'RESET_SOCKET_MESSAGE';
export const SHOW_SOCKET_MESSAGE = 'SHOW_SOCKET_MESSAGE';
export const ADD_SOCKET_MESSAGE = 'ADD_SOCKET_MESSAGE';

export const ResetSocketMessage = (payload) => {
  return {
    type: RESET_SOCKET_MESSAGE,
    payload,
  };
};

export const ShowSocketMessage = (payload) => {
  return {
    type: SHOW_SOCKET_MESSAGE,
    payload,
  };
};

export const AddSocketMessage = (payload) => {
  return {
    type: ADD_SOCKET_MESSAGE,
    payload,
  };
};

// --------------setSocketUserReducer--------------------
export const SET_SOCKET_USER = 'SET_SOCKET_USER';
export const ShowSocketUser = (payload) => {
  return {
    type: SET_SOCKET_USER,
    payload,
  };
};

// --------------chatRoomListReducer--------------------
export const SHOW_CHATROOMLIST = 'SHOW_CHATROOMLIST';
export const SHOW_CHATROOMLIST_TITLE = 'SHOW_CHATROOMLIST_TITLE';
export const SHOW_CHATROOMLIST_CONTENTS = 'SHOW_CHATROOMLIST_CONTENTS';

export const ShowChatRoomList = (payload) => {
  return {
    type: SHOW_CHATROOMLIST,
    payload,
  };
};

export const showChatRoomTitle = (payload) => {
  return {
    type: SHOW_CHATROOMLIST_TITLE,
    payload,
  };
};

export const showChatRoomContents = (payload) => {
  return {
    type: SHOW_CHATROOMLIST_CONTENTS,
    payload,
  };
};

// --------------chatRoomListReducer--------------------

// export const showChatRoomContents = (payload) => {
//   return {
//     type: SHOW_CHATROOMLIST_CONTENTS,
//     payload,

//   };
