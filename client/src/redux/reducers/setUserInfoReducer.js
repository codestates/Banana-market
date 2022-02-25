//Reducer 는 현재의 state와 Action을 이용해서 새로운 state를 만들어 내는 pure function

import { SET_UPDATE_USER_INFO, SET_USER_INFO_NULL, SET_USER_INFO_NICKNAME, SET_USER_INFO_REGION, SET_USER_INFO_PROFILE_IMG_NULL } from "../actions/actions"; // actions.js에 정의한 type명 변수 불러옴.
import { initialStateUserInfo } from "./initialState"; // state초기값 불러옴.

// action.type에 따른 함수 생성
const setUserInfoReducer = ( state=initialStateUserInfo, action ) => {
  switch(action.type){
    case SET_UPDATE_USER_INFO:
      let response = action.payload;
      let result = {
        userId: response.userId,
        nickName: response.name,
        email: response.email,
        profileImage: response.profileImage,
        region: response.region,
        block: response.block,
        type: response.type,
        totalTrade: response.totalTrade,
      }
      return result;
    case SET_USER_INFO_NULL:
      return Object.assign({}, state, {
        userId: null,
        nickName: null,
        email: null,
        profileImage: null,
        region: null,
        block: null,
        type: null,
        totalTrade: null,
      });
    case SET_USER_INFO_NICKNAME: 
      return Object.assign({}, state, {
        userId: state.userId,
        nickName: action.payload,
        email: state.email,
        profileImage: state.profileImage,
        region: state.region,
        block: state.block,
        type: state.type,
        totalTrade: state.totalTrade,
      });
    case SET_USER_INFO_REGION: 
      return Object.assign({}, state, {
        userId: state.userId,
        nickName: state.nickName,
        email: state.email,
        profileImage: state.profileImage,
        region:  action.payload,
        block: state.block,
        type: state.type,
        totalTrade: state.totalTrade,
      });
    case SET_USER_INFO_PROFILE_IMG_NULL:
      return Object.assign({}, state, {
        userId: state.userId,
        nickName: state.nickName,
        email: state.email,
        profileImage: null,
        region:  state.region,
        block: state.block,
        type: state.type,
        totalTrade: state.totalTrade,
      });
    default: 
      return state;
  }
}

export default setUserInfoReducer;