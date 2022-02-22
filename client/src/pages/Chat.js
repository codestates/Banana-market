import React, { useState } from "react";
import styled from "styled-components";
import ChatList from "../component/ChatList";
import ChatRoom from "../component/ChatRoom";

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
    margin: 53px auto 0 auto;
  }
`;

const Chat = () => {
  const [display, setDisplay] = useState("none");
  const [display1, setDisplay1] = useState("block");
  const onClick = () => {
    display === "none" ? setDisplay("block") : setDisplay("none");
    display1 === "block" ? setDisplay1("none") : setDisplay1("block");
  };
  const onClick2 = () => {
    display === "block" ? setDisplay("none") : setDisplay("none");
    display1 === "none" ? setDisplay1("block") : setDisplay1("none");
  };

  return (
    <div className="section2">
      <ChatDiv>
        <ChatList display={display} onClick2={onClick2}></ChatList>
        <ChatRoom display1={display1} onClick={onClick}></ChatRoom>
      </ChatDiv>
    </div>
  );
};

export default Chat;
