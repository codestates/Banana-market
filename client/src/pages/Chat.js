import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ChatList from "../component/ChatList";
import ChatRoom from "../component/ChatRoom";
import axios from "axios";

const ChatDiv = styled.div`
  max-width: 1200px;
  margin: 80px auto;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 380px auto;
  @media screen and (max-width: 1200px) {
    /* margin: 80px auto 30px auto; */
    width: 95%;
  }
  @media screen and (max-width: 768px) {
    /* margin: 80px auto 30px auto; */
    grid-template-columns: auto;
    width: 100%;
    margin: 53px auto 0 auto;
  }
`;
const ChatListDiv = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 710px;
  position: absolute;
  z-index: 1;
  background-color: rosybrown;
  @media screen and (max-width: 1200px) {
    /* margin: 80px auto 30px auto; */
    width: 95%;
  }
  @media screen and (max-width: 768px) {
    /* margin: 80px auto 30px auto; */
    width: 100%;
  }
`;


const Chat = () => {

  const chatListData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/rooms`)
      .then((chatData) => {
        console.log(chatData);
        // dispatch({
        //   type: 'SHOW_CHATLIST',
        //   payload: chatData.data.data.roomList,
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chatListData();
  }, []);

  const fakelist = [
    {
      id: 1,
      image:
        "https://yts.lt/assets/images/movies/deadpool_2016/small-cover.jpg",
      title: "[ 공구 ] 사과 공구 같이하실 분",
      content: "몇시에 뵐까요 ?",
      createdAt: "2022-02-16",
    },
    {
      id: 2,
      image:
        "https://yts.lt/assets/images/movies/furious_seven_2015/small-cover.jpg",
      title: "[ 나눔 ] 사과 나눔합니다",
      content: "안녕하세요 !",
      createdAt: "2022-02-17",
    },
  ];
  const [list, setList] = useState([]);
  const [curChatRoom, setCurChatRoom] = useState(list[0]);

  const [display, setDisplay] = useState("none");
  const [display1, setDisplay1] = useState("block");

  const onClick = () => {
    display === "none" ? setDisplay("block") : setDisplay("none");
    display1 === "block" ? setDisplay1("none") : setDisplay1("block");
  };
  const onClick2 = () => {
    display === "block" ? setDisplay("none") : setDisplay("none");
    display1 === "none" ? setDisplay1("block") : setDisplay1("block");
  };
  const handleCardClick = (listId) => {
    let title = list.filter((el) => {
      if (el.id === listId) {
        return el;
      }
      return false;
    });
    setCurChatRoom(...title);
  };

  return (
    <div className="section2">
      <ChatDiv>
        <ChatList
          display={display}
          onClick2={onClick2}
          chatList={list}
          handleCardClick={handleCardClick}
        ></ChatList>
        <ChatRoom
          display1={display1}
          onClick={onClick}
          curChatRoom={curChatRoom}
        ></ChatRoom>
        {/* <ChatListDiv>
          <ChatList></ChatList>
        </ChatListDiv> */}
        {/* <ChatList></ChatList> */}
      </ChatDiv>
    </div>
  );
};

export default Chat;
