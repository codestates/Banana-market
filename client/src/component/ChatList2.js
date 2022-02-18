import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
const ChatListDiv = styled.div`
  /* min-width: 360px; */
  min-height: 710px;
  border: 1px solid #c4c4c4;
  background-color: #fff;
  @media screen and (max-width: 767px) {
    border: none;
    /* display: none; */
  }
  > p {
    height: 35px;
    margin: 15px 15px 0 15px;
    border-bottom: 1px solid #c4c4c4;
    /* background-color: beige; */
  }

  .chatList_div {
    height: 660px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    @media screen and (max-width: 767px) {
      width: 100%;
      /* height: 730px; */
    }
    > .grid {
      width: 360px;
      display: grid;
      grid-template-columns: auto;
      padding: 15px 0 15px 15px;
      grid-gap: 15px;
      @media screen and (max-width: 767px) {
        width: 96%;
      }
      > li {
        box-shadow: 2px 2px 3px 1px #ddd;
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
            min-height: 60px;
            background-color: #ddd;
            border-radius: 10px;
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

const ChatList = () => {
  const history = useHistory();
  const fakelist = [1, 2, 3, 4, 1, 1, 2, 2, 3];
  const [list, setList] = useState(fakelist);
  return (
    <ChatListDiv>
      <p>채팅 리스트</p>
      <div className="chatList_div">
        <ul className="grid">
          {list.map((el) => (
            <li
              onClick={() => {
                history.push("/chat");
              }}
            >
              <ul className="in_grid">
                <li className="profile_img"></li>
                <li className="chat_info">
                  <ul>
                    <li className="chat_title">
                      [ 공구 ] 사과 공구 같이하실 분
                    </li>
                    <li className="content">몇시에 뵐까요 ?</li>
                    <li className="created_At">2022-02-16</li>
                  </ul>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </ChatListDiv>
  );
};

export default ChatList;
