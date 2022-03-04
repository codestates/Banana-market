//Reducer 는 현재의 state와 Action을 이용해서 새로운 state를 만들어 내는 pure function

import { RESET_SOCKET_MESSAGE, SHOW_SOCKET_MESSAGE, ADD_SOCKET_MESSAGE } from "../actions/actions"; // actions.js에 정의한 type명 변수 불러옴.
import { initialStateSocketMessage } from "./initialState"; // state초기값 불러옴.

// action.type에 따른 함수 생성
const setSocketMessageReducer = ( state=initialStateSocketMessage, action ) => {
  switch(action.type){
    case RESET_SOCKET_MESSAGE: 
      return [
        {
          article_id: null,
          user_id: null,
          contents: null,
          createdAt: null,
        },
      ];
    case SHOW_SOCKET_MESSAGE:
      let socketMessage = action.payload;
      return socketMessage;
    case ADD_SOCKET_MESSAGE:
      let newMessage = action.payload;
      return [
        ...state, newMessage
      ];
    default: 
      return state;
  }
}

export default setSocketMessageReducer;