import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const ChatRoomDiv = styled.div`
  min-height: 710px;
  border: 1px solid #c4c4c4;
  @media screen and (max-width: 768px) {
    border: none;
    display: none;
  }
  .chat_title {
    width: 100%;
    height: 50px;
    border-bottom: 1px solid #c4c4c4;
    display: grid;
    grid-template-columns: auto 40px;
    padding: 10px;
    grid-gap: 19px;
    background-color: #fff;
    @media screen and (max-width: 768px) {
      grid-template-columns: 30px auto 40px;
      grid-gap: 10px;
    }
    .back_btn {
      display: none;
      @media screen and (max-width: 768px) {
        display: block;
        min-height: 30px;
        background-color: #ddd;
        cursor: pointer;
      }
    }
    .title {
      height: 30px;
      margin-left: 5px;
      p {
        font-size: 17px;
        font-weight: 500;
        line-height: 30px;
        @media screen and (max-width: 1200px) {
          font-size: 16px;
          line-height: 30px;
        }
      }
      @media screen and (max-width: 768px) {
        margin-left: 0px;
      }
    }
    .set_btn {
      min-height: 30px;
      background-color: #ddd;
      cursor: pointer;
    }
  }
  .chat_room {
    height: 590px;
    /* background-color: blanchedalmond; */
    background-color: #fff;
    overflow-y: scroll;
    @media screen and (max-width: 768px) {
      height: 650px;
    }
  }
  .chat_room {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  .chat_room::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
  }

  .chat_content {
    height: 70px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: auto 40px;
    padding: 15px;
    grid-gap: 19px;
    background-color: #f4f4f4;

    input {
      height: 40px;
      background-color: #f4f4f4;
      font-size: 16px;
      margin-left: 5px;
      border: none;
    }
    input:focus {
      outline: none;
    }
    .message_btn {
      min-height: 40px;
      background-color: #ddd;
      border-radius: 50px;
      cursor: pointer;
    }
  }
`;

const ChatRoom = () => {
  const history = useHistory();
  return (
    <ChatRoomDiv>
      {/* <div className="chat_title">
        <div
          className="back_btn"
          onClick={() => {
            history.push("/chatList");
          }}
        >
          <path></path>
        </div>
        <div className="title">
          <p>[ 공구 ] 사과 공구 같이하실 분</p>
        </div>
        <div className="set_btn"></div>
      </div>
      <div className="chat_room"></div>
      <div className="chat_content">
        <input
          type="text"
          className="message"
          placeholder="메세지를 입력해주세요."
        ></input>
        <div className="message_btn"></div>
      </div> */}
    </ChatRoomDiv>
  );
};

export default ChatRoom;
