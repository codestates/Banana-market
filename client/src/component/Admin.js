import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Wrapper = styled.div`
  padding-top: 50px;
  max-width: 1200px;
  font-size: 20px;
  margin: 80px auto 15px auto;
  font-size: 16px;
  color: #444;
  @media screen and (max-width: 1200px) {
    margin: 50px 15px 15px 15px;
  }

  @media screen and (max-width: 767px) {
    padding-top: 100px;
    margin: 75px 10px 10px 10px;
    height: 30px;
  }

  ul {
    max-width: 1200px;
    margin: 0px auto 70px auto;
    display: grid;
    grid-template-columns: auto auto;
    padding: 5px;
    grid-gap: 30px;
    /* background-color: ChatList; */

    @media screen and (max-width: 1200px) {
      grid-template-columns: auto auto;
      grid-gap: 25px;
      padding: 15px;
      margin: 35px auto 80px auto;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: auto;
      grid-gap: 15px;
      padding: 10px;
      margin: 0 auto 20px auto;
    }
    > li {
      background-color: white;
      border-radius: 10px;
      padding: 20px;

      > div.userinfo_area {
        display: flex;
        line-height: 24px;
        >img{
          width: 100px;
          height: 100px;
        }
        >div.userinfo_text {
          margin-left: 30px;
          span{
            font-weight: 600;
          }
        }
      }
      > div.block_btn {
        width: 100%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: red;
        margin-top: 20px;
        color: white;
        border-radius: 10px;
      }
    }
  }
  .userinfo_area {
    
  }
  
`;


const Admin = () => {
  //임의의 신고된 유저 리스트 
  const [list, setList] = useState([{
    userId: '다오',
    name: '다오',
    email: '다오이메일',
    profileImage: 'https://media.vlpt.us/images/ez0ez0/post/dc0f7d3f-6bd7-4788-81c4-c5bc16f8cd80/placeholder.png',
    block:''
  },
  {
    userId: '다오1',
    name: '다오1',
    email: '다오이메일1',
    profileImage: 'https://media.vlpt.us/images/ez0ez0/post/dc0f7d3f-6bd7-4788-81c4-c5bc16f8cd80/placeholder.png',
    block:''
  },
  {
    userId: '다오2',
    name: '다오2',
    email: '다오이메일2',
    profileImage: 'https://media.vlpt.us/images/ez0ez0/post/dc0f7d3f-6bd7-4788-81c4-c5bc16f8cd80/placeholder.png',
    block:''
  }]);

  const handleClickBlockUser = () => {
    alert('유저차단axio보내주세요.')
  }

  return (
    <div>
      <Wrapper>
        <div className='report_list'>
          <ul>
          {list.map((el, idx) => (
            <li key={idx} >
              <div className='userinfo_area'>
                <img src={el.profileImage}/>
                <div class='userinfo_text'>
                  <div className='userId'> <span>유저 아이디 :</span> {el.userId}</div>
                  <div className='name'><span>유저 이름 : </span>{el.name}</div>
                  <div className='email'><span>유저 이메일 : </span>{el.email}</div>
                  <div className='block'><span>block 정보 : </span>{el.block}</div>
                </div>
              </div>
              <div className='block_btn' onClick={handleClickBlockUser}>정지버튼</div>
            </li>
          ))}
          </ul>
        
        </div>
      </Wrapper>
    </div>
  );
};

export default Admin;