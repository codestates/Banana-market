//Reducer 는 현재의 state와 Action을 이용해서 새로운 state를 만들어 내는 pure function
// rootReducer.js  :: 리듀서 하나로 합치는 파일
import { combineReducers } from 'redux';
import setLoginReducer from './setLoginReducer'; //리듀서 가져오기
import setUserInfoReducer from './setUserInfoReducer';
import postListReducer from './postListReducer';
import postDetailReducer from './postDetailReducer';
import setSearchListReducer from './setSearchListReducer';
import setSearchInfoReducer from './setSearchInfoReducer';
import myPostListReducer from './myPostListReducer';
import chatListReducer from './chatListReducer';
import chatRoomReducer from './chatRoomReducer';
import setMessageReducer from './setMessageReducer';
import setAdminLoginReducer from './setAdminLoginReducer';
import setSocketMessageReducer from './setSocketMessageReducer';


const rootReducer = combineReducers({
  setLoginReducer,
  setUserInfoReducer,
  postListReducer,
  postDetailReducer,
  setSearchListReducer,
  setSearchInfoReducer,
  myPostListReducer,
  chatListReducer,
  chatRoomReducer,
  setMessageReducer,
  setAdminLoginReducer,
  setSocketMessageReducer
});

export default rootReducer;
