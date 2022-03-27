import React, { useEffect, useState } from 'react';
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
  const [reportedUsers, setReportedUsers] = useState([]);
  const [blockinfo, setBlockInfo] = useState('true');
  const [blockedUserId, setBlockedUserId] = useState();

  const getReportUserList = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/admin/report`, {
      withCredentials: true,
    })
  }

  useEffect(async()=> {
    let userList = await (await getReportUserList()).data.data.reportedUserInfo;
    if (userList.length) {
      userList = userList.map((el) => {
        let profileImageKey = el.profileImage;
        el.profileImage = `https://d35fj6mbinlfx5.cloudfront.net/${profileImageKey}?w=70&h=70&f=webp&q=90`;
        return el
      })
      setReportedUsers(userList)
    }
  }, [blockedUserId])

  const handleClickBlockUser = async(userId) => {
    // alert('유저차단axio보내주세요.')
    let userBlock = await axios
    .patch(`${process.env.REACT_APP_API_URL}/admin/block`, {
      userId: userId
    }, {
      withCredentials: true,
    })
    userBlock = userBlock.data.data.userId
    setBlockedUserId(userBlock)
  }
  
  return (
    <div>
      <Wrapper>
        <div className='report_list'>
          <ul>
          {reportedUsers.map((reportedUser, idx) => (
            <li key={idx} >
              <div className='userinfo_area'>
                <img src={reportedUser.profileImage}/>
                <div class='userinfo_text'>
                  <div className='userId'><span>유저 아이디 :</span> {reportedUser.userId}</div>
                  <div className='name'><span>유저 이름 : </span>{reportedUser.name}</div>
                  <div className='email'><span>유저 이메일 : </span>{reportedUser.email}</div>
                  <div className='block'><span>block 정보 : </span>{
                  reportedUser.userId === blockedUserId? blockinfo : reportedUser.block.toString()
                  }</div>
                </div>
              </div>
              <div className='block_btn' onClick={()=>handleClickBlockUser(reportedUser.userId)}>정지버튼</div>
            </li>
          ))}
          </ul>
        </div>
      </Wrapper>
    </div>
  );
};

export default Admin;