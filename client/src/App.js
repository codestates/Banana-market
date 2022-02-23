import "./App.css";
import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import axios from "axios";
import Footer from "./component/Footer";
import Header from "./component/Header";
import Main from "./pages/Main";
import Test from "./pages/Test";
import Chat from "./pages/Chat";
import MyList from "./pages/MyList";
import MyPage from "./pages/MyPage";
import Posting from "./pages/Posting";
import PostingView from "./pages/PostingView";
import PostList from "./pages/PostList";
import SignUp from "./pages/SignUp";

function App() {
  const [chatListDetail, setChatListDetail] = useState({});

  const handleChatClick = (articleid) => {
    axios
      .get(`http://localhost:3001/articles/${articleid}`)
      .then((detailData) => {
        console.log(detailData);
        setChatListDetail(detailData.data.data.post);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="App">
      <Header></Header>
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
          <MyPage></MyPage>
        </Route>
        <Route path="/posting">
          <Posting></Posting>
        </Route>
        <Route path="/view/:id">
          <PostingView
            chatListDetail={chatListDetail}
            setChatListDetail={setChatListDetail}
          ></PostingView>
        </Route>
        <Route path="/list">
          <PostList handleChatClick={handleChatClick}></PostList>
        </Route>
        <Route path="/signup">
          <SignUp></SignUp>
        </Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
