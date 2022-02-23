<<<<<<< HEAD
import { compose, createStore, applyMiddleware } from "redux";
import postListReducer from "./reducers/postListReducer";

const store = createStore(postListReducer);
=======
// state가 관리되는 오직 하나뿐인 저장소의 역할. Redux 앱의 state가 저장되어 있는 공간
//createStore와 더불어 다른 리듀서의 조합을 인자로 넣어서 스토어를 생성할 수 있습니다.
import {createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 크롬 익스텐션
import logger from 'redux-logger'; 
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';


const middleware = [logger, thunk];
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware))); 
>>>>>>> aaa54e1746e97686b1e2fcfa9b719b63021607c9

export default store;
