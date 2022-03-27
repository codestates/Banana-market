//Reducer 는 현재의 state와 Action을 이용해서 새로운 state를 만들어 내는 pure function

import { SET_LOGIN, SET_LOGOUT } from "../actions/actions"; // actions.js에 정의한 type명 변수 불러옴.
import { initialStateLogin } from "./initialState"; // state초기값 불러옴.

// action.type에 따른 함수 생성
const setLoginReducer = ( state=initialStateLogin, action ) => {
  switch(action.type){
    case SET_LOGIN: 
      return true;
    case SET_LOGOUT:
      return false;
    default: 
      return state;
  }
}

export default setLoginReducer;