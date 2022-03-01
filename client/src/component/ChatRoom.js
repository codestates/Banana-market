import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import SetModal from "./SetModal";
import { useMediaQuery } from "react-responsive";
import io from "socket.io-client"

const ChatRoomDiv = styled.div`
  /* min-width: 800px; */
  min-height: 710px;
  border: 1px solid #c4c4c4;
  /* position: absolute;
  right: 0; */
  box-sizing: border-box;
  display: ${(props) => props.display1};
  @media screen and (max-width: 768px) {
    border: none;
    /* display: none; */
    width: 100%;
    display: ${(props) => props.display1};
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
    background-color: #fff;
    overflow-y: scroll;
    @media screen and (max-width: 768px) {
      height: 632px;
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
    @media screen and (max-width: 768px) {
      height: 60px;
      padding: 10px;
    }
    input {
      height: 40px;
      background-color: #f4f4f4;
      font-size: 16px;
      margin-left: 5px;
      border: none;
      @media screen and (max-width: 768px) {
        margin-left: 3px;
      }
    }
    input:focus {
      outline: none;
    }
    .message_btn {
      min-height: 40px;
      background-color: #ddd;
      border-radius: 50px;
      cursor: pointer;
      @media screen and (max-width: 768px) {
        /* height: 30px; */
      }
    }
  }
`;
const SetDiv = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 710px;
  position: absolute;
  /* background-color: wheat; */
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
const BackBtn = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    min-height: 30px;
    background-color: #ddd;
    cursor: pointer;
  }
`;

const ChatRoomWrap = styled.div`
  min-height: 710px;
  box-sizing: border-box;
  background-color: whitesmoke;
  text-align: center;
  line-height: 710px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const endpoint = 'http://localhost:3001'
const chatroom = `${endpoint}/chatroom`

// socket 연결
const socket = io(chatroom, {
  withCredentials: true
})

const ChatRoom = ({ onClick, display1, setChatRoom, curChatRoom }) => {
  const history = useHistory();
  const [secessionModal, setSecessionModal] = useState(false);
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 768px)",
  });

  // 5번 아티클 6번 유저 
  const [roomId, setRoomId] = useState(3);      // 채팅하는 공구 게시글
  const [userId, setUserId] = useState(4);        // 
  const [message, setMessage] = useState('4번 유저가 3번 아티클에서 보냄');
  const [messages, setMessages] = useState([]);
  const [testLeave, setTestLeave] = useState(true)

  // useEffect(() => {
  //   console.log("소켓 좀 보자", socket)
  //   // 채팅방 참여하기
  //   socket.emit('join', { userId, roomId }, (error) => {
  //     if(error) console.log(error)
  //   })
  // }, [roomId])

  // 메세지 작성 handler
  const sendMessage = (event) => {
    // event.preventDefault();
    if(message) {
      socket.emit('sendMessage', ({ userId, roomId, message, created: Date.now() }), () => {
        setMessage('')
      });
    }
  }
  
  // 작성한 메세지 보여주기
  useEffect(() => {
    socket.on('message', ({ message, created }) => {
      setMessages(messages => [ ...messages, message ]);
      console.log("보낸 메세지 날짜 확인", message, created)
    });
    console.log("메세지들", messages)
  }, [message]);
  
  // 메세지 작성 실행
  useEffect(() => {
    if (message) {
      sendMessage();
    }
  }, [message])

  // 채팅방 나가기 handler
  // const leaveRoom = (event) => {
  //   // event.preventDefault();
  //   socket.emit('leave', ({ userId, roomId }), (error) => {
  //     if(error) console.log(error)
  //   })
  //   console.log(`${roomId}방을 나갔습니다`)
  // }

  // // 채팅방 나가기 실행
  // useEffect(() => {
  //   if (testLeave) {
  //     leaveRoom();
  //   }
  // }, [testLeave])

  return (
    <>
      {curChatRoom ? (
        <ChatRoomDiv display1={display1}>
          <div className="chat_title">
            <BackBtn
              className="back_btn"
              // onClick={() => {
              //   setChatRoom(false);
              // }}
              onClick={onClick}
            ></BackBtn>
            <div className="title">
              <p>{curChatRoom.title}</p>
            </div>
            <div
              className="set_btn"
              onClick={(e) => {
                setSecessionModal(true);
              }}
            >
              {/* {secessionModal === true ? (
              <SecessionModal
                setSecessionModal={setSecessionModal}
              ></SecessionModal>
            ) : null} */}
            </div>
          </div>
          <div className="chat_room"></div>
          <div className="chat_content">
            <input
              type="text"
              className="message"
              placeholder="메세지를 입력해주세요."
            ></input>
            <div className="message_btn"></div>
          </div>
        </ChatRoomDiv>
      ) : (
        <ChatRoomWrap>채팅방을 선택해주세요</ChatRoomWrap>
      )}

      {secessionModal === true ? (
        <SetDiv>
          <SetModal setSecessionModal={setSecessionModal}></SetModal>
        </SetDiv>
      ) : null}
    </>
  );
};

export default ChatRoom;