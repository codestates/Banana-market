import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory, useParams, Route } from 'react-router-dom';
import SetModal from './SetModal';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

// socket 연결
import io from 'socket.io-client';
// import { startsWith } from 'sequelize/types/lib/operators';
const endpoint = 'http://localhost:3001';
const chatroom = `${endpoint}/chatroom`;
const socket = io.connect(chatroom, {
  withCredentials: true,
});

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
    button.message_btn {
      width: 30px;
      min-height: 30px;
      background-color: #ddd;
      border-radius: 50px;
      cursor: pointer;
      float: right;
      @media screen and (max-width: 768px) {
        /* height: 30px; */
      }
    }
  }
`;

const ChatContent = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 15px;
  padding: 20px;

  .contentDiv {
    width: 330px;
    /* border: 1px solid #ddd; */

    .in_grid {
      display: grid;
      grid-template-columns: 40px auto;
      grid-gap: 15px;
      .profileImage {
        height: 40px;
        background-color: palegoldenrod;
        border-radius: 50px;
        /* img {
          width: 100%;
          height: 100%;
          border-radius: 50px;
        } */
      }
      .user_info {
        border-radius: 10px;

        .name {
          font-size: 15px;
        }

        .content_detail {
          display: flex;
          align-items: flex-end;
          margin-top: 10px;
          div {
            float: left;
          }
          .contents {
            font-size: 15px;
            max-width: 250px;
            height: 100%;
            box-sizing: border-box;
            background-color: cornsilk;
            p {
              padding: 10px;
              min-width: 20px;
            }
          }
          .createdAt {
            font-size: 12px;
            color: #9d9c9c;
            margin-left: 5px;
          }
        }
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

const ChatRoom = ({ chatRoomId, setChatRoomId, title }) => {
  const history = useHistory();
  const [secessionModal, setSecessionModal] = useState(false);
  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  let userId = setUserInfo.userId;
  
  // const chatRoomData = useSelector((state) => state.chatRoomReducer);
  // const { title, messageList } = chatRoomData;
  // console.log(chatRoomData);
  // console.log(messageList);

  const [message, setMessage] = useState([
    {
      profileImage: null,
      name: null,
      createdAt: null,
      content: null,
    },
  ]); // 채팅내용
  const [myMessage, setMyMessage] = useState([]); // 내가 보내는 메세지
  const [participant, setParticipant] = useState([]); // 참가자 목록

  // useEffect(() => {
  //   socket.on("message", ({}) => {
  //     setChat
  //   });
  // });
  const dispatch = useDispatch();
  // const [chat, setchat] = useState([1]);

  let articleNum = useParams();
  
  //참가자 정보 편집
  const participantEditObj = (participant) => {
    let ResultObj = {};
    participant.map ((el) => {
      let  participantObj = {
        'name': '', 'profileImage': '' }
      participantObj['name'] = el.name;
      participantObj['profileImage'] = el.profileImage;
      ResultObj[el.id] = participantObj;
    });
  return ResultObj;
  };

  // let user_id = 5;
  let socketParticipant = participantEditObj(participant); // 참가자 목록 편집
  
//-----------------------소캣 온 !!! 
  useEffect(() => {
    socket.on(
      'message',
      ({ contents, createdAt }) => {
        setMessage([
          ...message,
          {
            contents: contents,
            profileImage: socketParticipant.user_id.profileImage,
            name: socketParticipant.user_id.name,
            createdAt: createdAt
          },
        ]);

        console.log(message, '내가 보낸 메세지 받았니 ? ')
      },
      (error) => {
        if (error) console.log(error);
      }
    );
  }, []);

  ////-------------------------------------------

  // // socket.on 받은 메세지 편집
  // const messageObj = {
  //   profileImage: chatParticipants.userId.,
  //   name: null,
  //   createdAt: null,
  //   content: null,
  // }
  // userId: userId,
  // roomId: chatRoomId,
  // message: myMessage,
  // created: message,
  useEffect(() => {
    //채팅방 바뀔때 채팅내용 불러오기--------------0
    chatContent(chatRoomId);
  }, [chatRoomId]);

  function getToday() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ('0' + (1 + date.getMonth())).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }
  let today = getToday();

  function isToday(date) {
    if (date === null || date === '') {
      return '';
    } else {
      let resultDate = String(date).split(' ')[0];
      let resultTime = String(date).split(' ')[1];
      if (resultDate === today) {
        if (resultTime.split(':')[0] > 12) {
          return (
            '오후 ' +
            (Number(resultTime.split(':')[0]) - 12) +
            ':' +
            Number(resultTime.split(':')[1])
          );
        } else {
          return (
            '오전 ' +
            Number(resultTime.split(':')[0]) +
            ':' +
            Number(resultTime.split(':')[1])
          );
        }
      } else {
        return resultDate;
      }
    }
  }

  //채팅방 선택 진입 (채팅내용, 참여자 불러옴)----------- 1
  const chatContent = (chatRoomId) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/rooms/messages/${chatRoomId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log('데이터', res.data.data.messageList);
        setMessage([]);
        if (res.data.data.messageList !== undefined) {
          setMessage([...res.data.data.messageList].reverse());
        } else {
          setMessage([]);
        }

        axios
          .get(
            `${process.env.REACT_APP_API_URL}/rooms/participant/${chatRoomId}`,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log('참여자 목록', res.data.data.participant);
            setParticipant([...res.data.data.participant]);
            // 채팅방 참여하기 ------------------------ 2 :: 소캣으로 채팅 참여
            socket.emit('join', { userId, chatRoomId });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(chatRoomId);
        console.log(err);
      });
  };

  // 작성한 메세지 인풋값 저장
  const handleChangeMessage = (e) => {
    setMyMessage(e.target.value);
  };
  // 메세지 보내기 버튼 클릭시 진행되는 함수
  const handleClickSendMessage = (e) => {
    // console.log(myMessage, userId, chatRoomId, myMessage)
    console.log('메세지 보냄');
    e.preventDefault();
    //socket.emit('sendMessage', 'from front');
    socket.emit(
      'sendMessage',
      {
        userId: userId,
        roomId: chatRoomId,
        message: myMessage,
        created: message,
      },
      (error) => {
        if (error) console.log(error);
      }
    );
    setMyMessage('');
  };

  

  //   // 채팅방 나가기 handler
  const leaveRoom = (event) => {
    // event.preventDefault();
    let obj = { userId: userId, roomId: chatRoomId };
    socket.emit('leave', obj, (error) => {
      if (error) console.log(error);
    });
    console.log(`${obj.roomId}방을 나갔습니다`);
    // history.push('/chat/0');
  };

  return (
    <Route path={'/chat/' + chatRoomId}>
      {title ? (
        <ChatRoomDiv>
          <div className="chat_title">
            <BackBtn
              className="back_btn"
              // onClick={() => {
              //   history.push(`/chat/${ar}`);
              // }}
            ></BackBtn>
            <div className="title">
              <p>{title}</p>
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
          <div className="chat_room">
            <ChatContent>
              {message.length !== 0 ? (
                message.map((el, idx) => (
                  <li className="contentDiv" key={idx}>
                    <ul className="in_grid">
                      <li className="profileImage">
                        <img src={el.profileImage}></img>
                      </li>
                      <li className="user_info">
                        <ul>
                          <li className="name">{el.name}</li>
                          <li className="content_detail">
                            <div className="contents">
                              <p>{el.contents}</p>
                            </div>
                            <div className="createdAt">
                              {isToday(el.createdAt)}
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                ))
              ) : (
                <div> 채팅을 시작해주세요. </div>
              )}
            </ChatContent>
          </div>
          <div className="chat_content">
            <form onSubmit={handleClickSendMessage}>
              <input
                type="text"
                className="message"
                placeholder="메세지를 입력해주세요."
                onChange={handleChangeMessage}
                value={myMessage}
                // value={message || ''}
              ></input>
              <button className="message_btn"></button>
            </form>
          </div>
        </ChatRoomDiv>
      ) : (
        <ChatRoomWrap>채팅방을 선택해주세요</ChatRoomWrap>
      )}

      {secessionModal === true ? (
        <SetDiv>
          <SetModal
            setSecessionModal={setSecessionModal}
            leaveRoom={leaveRoom}
          ></SetModal>
        </SetDiv>
      ) : null}
    </Route>
  );
};

export default ChatRoom;
