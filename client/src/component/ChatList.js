import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
// import { useMediaQuery } from "react-responsive";
// import ChatRoom from "../component/ChatRoom";

const ChatListDiv = styled.div`
  /* min-width: 360px; */
  min-height: 710px;
  border: 1px solid #c4c4c4;
  @media screen and (max-width: 767px) {
    border: none;
    height: 742px;
    display: ${(props) => props.display};
  }
  > p {
    height: 35px;
    margin: 15px 15px 0 15px;
    border-bottom: 1px solid #c4c4c4;
    /* background-color: beige; */
  }

  .chatList_div {
    height: 645px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    @media screen and (max-width: 767px) {
      width: 100%;
      height: 670px;
    }
    > .grid {
      width: 360px;
      display: grid;
      grid-template-columns: auto;
      padding: 15px 0 15px 15px;
      grid-gap: 15px;
      /* background-color: violet; */
      @media screen and (max-width: 767px) {
        width: 96%;
      }
      > li {
        box-shadow: 2px 2px 3px 2px #ddd;
        min-height: 85px;
        /* border: 1px solid #ddd; */
        border-radius: 10px;
        cursor: pointer;

        .in_grid {
          display: grid;
          grid-template-columns: 60px auto;
          grid-gap: 15px;
          padding: 10px;
          margin-top: 3px;
          .profile_img {
            height: 60px;
            background-color: #ddd;
            border-radius: 10px;
            img {
              width: 100%;
              height: 60px;
              border-radius: 10px;
            }
          }
          .chat_info {
            min-height: 60px;
            border-radius: 10px;
            position: relative;

            .chat_title {
              width: 100%;
              font-size: 14px;
              margin-top: 8px;
            }
            .content {
              width: 67%;
              font-size: 13px;
              margin-top: 10px;
            }
            .created_At {
              font-size: 11px;
              position: relative;
              bottom: 15%;
              color: #9d9c9c;
              text-align: right;
              position: absolute;
              right: 0;
            }
          }
        }
      }
    }
  }
  .chatList_div::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera */
    /* @media screen and (max-width: 767px) {
      display: block;
    } */
  }
`;
const ChatRoomDiv = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 710px;
  position: absolute;
  /* background-color: whitesmoke; */
  z-index: 1;
  @media screen and (max-width: 1200px) {
    /* margin: 80px auto 30px auto; */

    width: 95%;
  }
  @media screen and (max-width: 768px) {
    /* margin: 80px auto 30px auto; */
    width: 100%;
  }
`;

const ChatList = ({ display, onClick2, chatList, handleCardClick }) => {
  const history = useHistory();
  const [chatRoom, setChatRoom] = useState(false);

  return (
    <>
      <ChatListDiv display={display}>
        <p>채팅 리스트</p>
        <div className="chatList_div">
          {chatList.length === 0 ? (
            <p style={{ textAlign: "center", lineHeight: "645px" }}>
              "채팅 목록이 비었습니다"
            </p>
          ) : (
            <ul className="grid">
              {chatList.map((el) => (
                <li
                  // onClick={() => {
                  //   setChatRoom(true);
                  // }}
                  onClick={() => {
                    handleCardClick(el.id);
                    onClick2();
                  }}
                  // onClick={onClick2}
                >
                  <ul className="in_grid">
                    <li className="profile_img">
                      <img src={el.image}></img>
                    </li>
                    <li className="chat_info">
                      <ul>
                        <li className="chat_title">{el.title}</li>
                        <li className="content">{el.content}</li>
                        <li className="created_At">{el.createdAt}</li>
                      </ul>
                    </li>
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      </ChatListDiv>
      {/* {chatRoom === true ? (
        // <ChatRoomDiv>
        <ChatRoom setChatRoom={setChatRoom}></ChatRoom>
      ) : (
        // </ChatRoomDiv>
        <ChatRoomWrap>채팅방을 선택해주세요</ChatRoomWrap>
      )} */}
    </>
  );
};

export default ChatList;
