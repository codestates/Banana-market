import React from "react";
import styled from "styled-components";
import ChatList2 from "../component/ChatList2";
import ChatRoom2 from "../component/ChatRoom2";

const ChatDiv = styled.div`
  max-width: 1200px;
  /* background-color: aquamarine; */
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
    margin: 55px auto 0 auto;
  }
`;

const Chat = () => {
  return (
    <div className="section">
      <ChatDiv>
        <ChatList2></ChatList2>
        <ChatRoom2></ChatRoom2>
      </ChatDiv>
    </div>
  );
};

export default Chat;
