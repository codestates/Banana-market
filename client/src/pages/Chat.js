import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ChatList from '../component/ChatList';
import ChatRoom from '../component/ChatRoom';
import { useSelector, useDispatch } from 'react-redux';
import { ResetChatList } from '../redux/actions/actions';
import axios from 'axios';
// socket 연결
import io from 'socket.io-client';
const endpoint = 'http://localhost:3001';
const chatroom = `${endpoint}/chatroom`;
const socket = io.connect(chatroom, {
  withCredentials: true,
});


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

const Chat = () => {
  const [display, setDisplay] = useState('none');
  const [display1, setDisplay1] = useState('block');

  const [chatRoomId, setChatRoomId] = useState('');
  const dispatch = useDispatch();

  const chatListData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/rooms`, {
        withCredentials: true,
      })
      .then((chatData) => {
        // console.log(chatData.data.data.roomList);
        dispatch({
          type: 'SHOW_CHATLIST',
          payload: chatData.data.data.roomList,
        });
        // console.log(listData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    chatListData();
    return () => {
      dispatch(ResetChatList());
    };
  }, []);

  // const onClick = () => {
  //   display === 'none' ? setDisplay('block') : setDisplay('none');
  //   display1 === 'block' ? setDisplay1('none') : setDisplay1('block');
  // };
  // const onClick2 = () => {
  //   display === 'block' ? setDisplay('none') : setDisplay('none');
  //   display1 === 'none' ? setDisplay1('block') : setDisplay1('block');
  // };

  return (
    <div className="section2">
      <ChatDiv>
        <ChatList
          chatRoomId={chatRoomId}
          setChatRoomId={setChatRoomId}
        ></ChatList>
        <ChatRoom
          chatRoomId={chatRoomId}
          setChatRoomId={setChatRoomId}
        ></ChatRoom>
      </ChatDiv>
    </div>
  );
};

export default Chat;
