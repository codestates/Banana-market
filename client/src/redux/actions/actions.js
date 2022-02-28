import { createAction } from 'redux-action';
// Action은 말 그대로 어떤 액션을 취할 것인지 정의해 놓은 객체

// ---------------setLoginReducer--------------
// action types : reducer.js와 actions.js 에서 공통으로 사용하므로 변수로 선언함.
export const SET_LOGIN = 'SET_LOGIN';
export const SET_LOGOUT = 'SET_LOGOUT';
// actions creator functions
export const setLogin = () => ({ type: SET_LOGIN });
export const setLogout = () => ({ type: SET_LOGOUT });

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

// --------------chatListReducer--------------------
export const ADD_TO_CHATLIST = 'ADD_TO_CHATLIST';
export const SHOW_CHATLIST = 'SHOW_CHATLIST';

export const addToChatList = (payload) => {
  return {
    type: ADD_TO_CHATLIST,
    payload,
  };
};

export const ShowChatList = (payload) => {
  return {
    type: SHOW_CHATLIST,
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
