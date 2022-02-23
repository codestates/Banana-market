import React, {useState} from 'react';
import styled from "styled-components";
import { Link } from "react-router-dom";
import '../App.css'; //이거 써줘야 css적용됨.

import SearchModal from './SearchModal';
import LoginModal from './LoginModal';
import MenuModal from './MenuModal';

import logo from "../icon/logo.png";
import login from "../icon/login.png";

const BREAK_POINT_TABLET = 768;
const BREAK_POINT_PC = 1200;

const MenuModalWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 9999;
`;

const LoginModalWrapper = styled.div`
  /* position: absolute;
  width: 100%;
  z-index: 9999; */
`;
const SearchModalWrapper = styled.div`
  /* padding-top: 10px; */
  position: fixed;
  width: 100%;
  z-index: 9999;
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px){
    padding-top: 0px;
    left: 145px;
  }
  @media only screen and (min-width: ${BREAK_POINT_PC}px){
    left: 182px;
  }
`;
const Wrapper = styled.div`
  //( 기본적용 )모바일 : 768px 이하 ::  @media only제외한 모든 사이즈 적용
  width: 100%;
  height: 100%;
  padding: 0 10px;
  margin : auto;
  /* border: 2px solid black;
  background-color: violet; */

  .logo {
    height: 100%;
    padding: 12px;
    /* border: 1px solid black; */
    float: left;
    .logo_icon {
      height: 26px;
    }
  }
  .menu_wrapper{
    height: 100%;
    float: right;
    .icon{
      width: 50px;
      height: 100%;
      padding: 14px;
      /* border: 1px solid black; */
      float: left;
      .icon_img {
        height: 22px;
        /* background-color: white; */
      }
    }
  }
  
  .search_box2{
    float: left;
    width: 100%;
    height: 50px;
    padding: 0 12px;
    /* background-color: gray; */
    .search {
      width: 100%;
      height: 36px;
      margin : auto;
      border-radius: 100px;
      background-color: #f8f9fa;
      padding: 8px 15px;
      .search_icon{
        width: 20px;
        float: left;
      }
      >span{
        padding-left: 15px;
        float: left;
        line-height: 20px;
        color: rgba(0,0,0,0.5)
      }
    }
  }
  @media only screen and (max-width: 768px){
    .search_box1{
      display: none;
    }
  }
  // 태블릿 : 1200px ~ 768px :: 768px 이상 적용되는 css
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px){

    .search_box1{
        width: calc(100vw - 333px);
        height: 50px;
        float: left;
        padding: 10px 40px 0 40px;
        /* background-color:red; */
        .search {
        width: 100%;
        height: 36px;
        margin: auto;
        border-radius: 100px;
        background-color: #f8f9fa;
        padding: 8px 15px;
        .search_icon{
          width:20px;
          float: left;
        }
        >span{
          padding-left: 15px;
          float: left;
          line-height: 20px;
          color: rgba(0,0,0,0.5)
        }
      }
    }
    .search_box2{
      display: none;
    }
  }
  // PC : 1200px 이상 :: 1200px 이상 적용되는 css
  @media only screen and (min-width: ${BREAK_POINT_PC}px){
    width: 1200px;
    padding: 0;
    /* background-color: purple; */

    .logo {
    padding: 12px 14px 12px 0;
    .logo_icon {
        height: 36px;
      }
    }
    .search_box1{
        width:833px;
        height: 60px;
        padding: 12px 40px 0 40px;
        .search {
          width: 100%;
          height: 40px;
          margin: auto;
          border-radius: 100px;
        }
      }
    .menu_wrapper{
      .icon.menu_icon {
        width: 43px;
        padding: 17px 0 17px 17px;
      }
      .icon{
        width: 60px;
        padding: 17px;
        .icon_img {
          height: 26px;
        }
      }
    }
  }
`;

const Header = ( {handleResponseSuccess}) => {
  // useState로 Modal창 On(true)/Off(false)
  let [searchBox, setSearchBox] = useState(false);
  let [loginModal, setLoginModal] = useState(false);
  let [menuModal, setMenuModal] = useState(false);

  return (
    <>
      {searchBox ? <SearchModalWrapper>
        <SearchModal className='search_modal'setSearchBox={setSearchBox} ></SearchModal>
      </SearchModalWrapper> : <div></div>}
      {loginModal ? <LoginModalWrapper>
        <LoginModal 
          className='login_modal'
          loginModal={loginModal}
          setLoginModal={setLoginModal} 
          handleResponseSuccess={handleResponseSuccess}
        ></LoginModal>
      </LoginModalWrapper> : <div></div>} 
      {menuModal ? <MenuModalWrapper>
        <MenuModal 
          className='menu_modal'
          setMenuModal={setMenuModal} 
          setLoginModal={setLoginModal} 
        ></MenuModal>
      </MenuModalWrapper> : <div></div>} 
      
      <div className='header'>
        <Wrapper>
          <Link to='/list'>
            <div className='logo'>
              <img src={logo} className="logo_icon" />
            </div>
          </Link>
          <div className='search_box1'>
            <div className='search'  onClick={() => {setSearchBox(true);}}>
              <img src={login} className="search_icon" />
              <span>검색어 입력</span>
            </div>
          </div>
          <div className='menu_wrapper'>
            <div className='icon login_icon'>
              <img src={login} className="icon_img" onClick={() => {setLoginModal(true);}}/>
            </div>
            <Link to='/chat'>
              <div className='icon chat_icon'>
                <img src={login} className="icon_img" />
              </div>
            </Link>
            <div className='icon menu_icon'>
              <img src={login} className="icon_img"  onClick={() => {setMenuModal(true);}}/>
            </div>
          </div>
          <div className='search_box2'>
            <div className='search'   onClick={() => {setSearchBox(true);}}>
              <img src={login} className="search_icon" />
              <span>검색어 입력</span>
            </div>
          </div>
        </Wrapper>
        {/* <SearchModal></SearchModal>
        <LoginModal></LoginModal>
        <MenuModal></MenuModal> */}
      </div>
    </>
  );
};

export default Header;