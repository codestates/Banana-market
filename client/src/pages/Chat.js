import React from "react";
import styled from "styled-components";
import ChatList from "../component/ChatList";
import ChatRoom from "../component/ChatRoom";

const ChatDiv = styled.div`
  max-width: 1200px;
  background-color: aquamarine;
  margin: 80px auto;
`;

const Chat = () => {
  return (
    <div className="section">
      <ChatDiv>
        <ChatList></ChatList>
        <ChatRoom></ChatRoom>
      </ChatDiv>
    </div>
  );
};

export default Chat;
