import { compose, createStore, applyMiddleware } from "redux";
import postListReducer from "./reducers/postListReducer";

const store = createStore(postListReducer);

export default store;
