//Reducer 는 현재의 state와 Action을 이용해서 새로운 state를 만들어 내는 pure function

import { RESET_MESSAGE, SHOW_MESSAGE, ADD_MESSAGE } from "../actions/actions"; // actions.js에 정의한 type명 변수 불러옴.
import { initialStateMessage } from "./initialState"; // state초기값 불러옴.

// action.type에 따른 함수 생성
const setMessageReducer = ( state=initialStateMessage, action ) => {
  switch(action.type){
    case RESET_MESSAGE: 
      return [
        {
          profileImage: null,
          name: null,
          createdAt: null,
          contents: null,
        },
      ];
    case SHOW_MESSAGE:
      let messageList = action.payload;
      return messageList;
    case ADD_MESSAGE:
      let newMessage = action.payload;
      return [
        ...state, newMessage
      ];
    default: 
      return state;
  }
}

export default setMessageReducer;