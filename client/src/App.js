import './App.css';
import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  setLogin,
  setLogout,
  setUpdateUserInfo,
  setUserInfoNull,
} from './redux/actions/actions';

import axios from 'axios';
import Footer from './component/Footer';
import Header from './component/Header';
import Main from './pages/Main';
import Test from './pages/Test';
import Chat from './pages/Chat';
import MyList from './pages/MyList';
import MyPage from './pages/MyPage';
import Posting from './pages/Posting';
import PostingView from './pages/PostingView';
import PostList from './pages/PostList';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';
import CheckPersonalInform from './pages/CheckPersonalInform';

function App(props) {
  const history = useHistory();
  let setLoginState = useSelector((state) => state.setLoginReducer);
  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  let dispatch = useDispatch();

  const isAuthenticated = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/info`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: 'SET_UPDATE_USER_INFO', payload: res.data.data });
        dispatch(setLogin());
      })
      .catch((err) => {
        dispatch(setLogout());
        dispatch({ type: 'SET_USER_INFO_NULL' });
      });
  };

  const handleResponseSuccess = () => {
    isAuthenticated();
  };

  // google social login 시 authorization code를 server에 보내준다.
  const getGoogleAccessToken = async (authorizationCode) => {
    const result = await axios.post(
      `${process.env.REACT_APP_API_URL}/login/google/callback`,
      {
        authorizationCode,
      }
    );
  };
  // url에 authorizationCode가 있다면 AccessToken 요청
  const isGoogleAuthorizationCode = async () => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      getGoogleAccessToken(authorizationCode);
    }
  };

  //리로딩시 로그인이 풀리지 않도록함.
  useEffect(() => {
    isGoogleAuthorizationCode();
    handleResponseSuccess();
  }, []);

  // 로그아웃 버튼 클릭 시 진행되는 함수
  const handleChangeAuth = (e) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/logout`, {
        withCredentials: true,
      })
      .then((data) => {
        dispatch(setLogout());
        dispatch(setUserInfoNull());
        console.log('로그아웃되었습니다');
        history.push({
          pathname: '/',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <Header handleResponseSuccess={handleResponseSuccess}></Header>
      <Switch>
        <Route exact path="/">
          <Main></Main>
        </Route>
        <Route path="/test">
          <Test></Test>
        </Route>
        <Route path="/chat">
          <Chat></Chat>
        </Route>
        <Route path="/mylist">
          <MyList></MyList>
        </Route>
        <Route path="/mypage">
          <MyPage handleChangeAuth={handleChangeAuth}></MyPage>
        </Route>
        <Route path="/posting">
          <Posting></Posting>
        </Route>
        <Route path="/view">
          <PostingView></PostingView>
        </Route>
        <Route path="/list">
          <PostList></PostList>
        </Route>
        <Route path="/signup">
          <SignUp></SignUp>
        </Route>
        <Route path="/nullpage">
          <Logout></Logout>
        </Route>
        <Route path="/piprocess">
          <CheckPersonalInform></CheckPersonalInform>
        </Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
