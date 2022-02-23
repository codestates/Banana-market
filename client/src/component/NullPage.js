import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Chat from '../pages/Chat';
import { Link } from "react-router-dom";
import searchList from '../resource/cityList'
import PasswordModal from './PasswordModal';
import SecessionModal from './SecessionModal';
import null_icon from "../icon/null_icon.png";
import logout_icon from "../icon/logout_icon.png";


const Wrapper = styled.div`
  max-width: 1200px;
  margin: 50px auto;
  @media screen and (max-width: 767px) {
    margin: 80px auto 30px auto;
    width: 100%;
  }
  .detail {
    max-width: 1200px;
    height: 80vh;
    background-color: rgba(0, 130, 255,0.05);
    box-sizing: border-box;
    margin: 0 auto;
    /* background-color: peachpuff; */
    border-radius: 10px;
      > img.logicon{
        display: block;
        width: 200px;
        height: 200px;
        opacity: 0.2;
        margin: 0 auto;
        position: relative;
        top: 20vh;
      }
      > div.text1 {
        max-width: 1200px;
        margin: 0 auto;
        text-align: center;
        font-size: 26px;
        color:#b0d1f7;
        font-weight: 600;
        opacity: 0.6;
        position: relative;
        top: 24vh;
        line-height: 34px;
      }
      > div.text2 {
        display: none;
      }
    @media screen and (max-width: 1200px) {
     margin: 0 22px;
    }
    @media screen and (max-width: 767px) {
      margin: 0 22px;
      > div.text1 {
        display: none;
      }
      > div.text2 {
        display: block;
        width: 90%;
        margin: 0 auto;
        text-align: center;
        font-size: 26px;
        color:#b0d1f7;
        font-weight: 600;
        opacity: 0.6;
        position: relative;
        top: 24vh;
        line-height: 34px;
      }
    } 
  }`;


const NullPage = () => {
  
  return (
    <Wrapper>
      <div className="detail">
        <img className='logicon' src={null_icon} />
        <div className = 'text1'> 로그인이 필요한 서비스입니다.</div>
        <div className = 'text2'> 로그인이 필요한 <br/> 서비스입니다.</div>
      </div>
    </Wrapper>
  );
};

export default NullPage;