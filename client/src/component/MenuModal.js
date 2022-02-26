import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'; 
import { setLogin, setLogout } from '../redux/actions/actions';

import logo_svg from "../icon/logo.svg";
import shopping_cart from "../icon/shopping_cart.svg";
import logo from "../icon/logo.png";
import close from "../icon/close.png";
import person_icon from "../icon/person_icon.svg";
import shopping_icon from "../icon/shopping_icon.png";
import pen_icon from "../icon/pen_icon.png";
import next_icon from "../icon/next_icon.png";

const BREAK_POINT_TABLET = 768;
const BREAK_POINT_PC = 1200;

const MenuModalArea = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 100vh;
  /* margin: auto; */
  position: fixed;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  .modal_back {
    width: 100%;
    height: 100vh;
    /* background-color: green; */
  }
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  /* height: 50px; */
  position: fixed;
  z-index: 100;
  background: #fffbe0;
  .announcement {
    text-align: left;
    padding-left: 30px;
    margin-top: 10px;
    position: relative;
    line-height: 30px;
    >p{
      font-size: 22px;
      >span{
        font-weight: 600;
      }
    }
  }
  .menulist {
    padding: 20px 30px;
    >li.line {
      width: 100%;
      height: 1px;
      background-color: rgba(0,0,0,0.1);
      margin-bottom: 50px;
    }
  }
  .menu {
    height: 76px;
    /* background-color: red; */
    margin-bottom: 10px;
    font-size: 28px;
    color: #222324;
    font-weight: 500;
    .icon_img {
      margin-top: 21px;
      height: 22px;
      /* background-color: white; */
    }
    .icon {
      margin-right: 34px;
      opacity: 0.6;
    }
    .arrow {
      margin-top:24px;
      height: 16px;
      float: right;
      opacity: 0.9;
    }
    .shopping {
      height: 40px;
      margin-right: 30px;
      margin-top: 16px;
      position: relative;
      top: 3px;
    }
    > span {
      line-height: 50px;
    }
  }

  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    width: 450px;
    padding: 0;
    position: static;
    float: right;

    > div .logo {
      display: none;
    }
    .menu_wrapper {
      .icon.menu_icon {
        opacity: 0.5;
        width: 43px;
        padding: 17px 0 17px 17px;
      }
      .icon {
        width: 60px;
        padding: 17px;
        .icon_img {
          height: 26px;
        }
      }
    }
  }
`;

const HeaderBox = styled.div`
  //( 기본적용 )모바일 : 768px 이하 ::  @media only제외한 모든 사이즈 적용
  width: 100%;
  height: 60px;
  padding: 0 10px;
  margin: auto;
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
  .menu_wrapper {
    height: 100%;
    float: right;
    .icon {
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
`;

const ModalBack = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0px;
  z-index: -1;
  /* background-color: red; */
`;

const MenuModal = ({ setMenuModal, setLoginModal}) => {
  let setLoginState = useSelector((state) => state.setLoginReducer); 
  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  // 모달 밖 영역 클릭 시 모달 창 닫히는 함수
  const handleClickClose = (e) => {
    setMenuModal(false);
    console.log("누름");
  };

  return (
    <>
      <MenuModalArea>
        <ModalWrapper>
          <HeaderBox>
            <div className="logo">
              <img src={logo_svg} className="logo_icon" />
            </div>
            <div className="menu_wrapper">
              <div className="icon menu_icon">
                <img
                  src={close}
                  className="icon_img"
                  onClick={() => {
                    setMenuModal(false);
                  }}
                />
              </div>
            </div>
          </HeaderBox>
          <div className="announcement">
            {setLoginState ? <p><span>{setUserInfo.nickName}</span>님, 환영합니다.</p>
            : <span
                onClick={() => {
                  setMenuModal(false);
                  setLoginModal(true);
                }}
              >
                로그인 후 이용해주세요
              </span>
            }
          </div>
          <ul className="menulist">
            <li className='line'></li>
            <Link to={setLoginState ? "/mypage" : "/nullpage"} >
              <li
                className="menu"
                onClick={() => {
                  setMenuModal(false);
                }}
              >
                <img src={person_icon} className="icon_img icon" />
                <span>마이페이지</span>
                <img src={next_icon} className="icon_img arrow" />
              </li>
            </Link>
            <Link
              to="/posting"
              onClick={() => {
                setMenuModal(false);
              }}
            >
              <li className="menu">
                <img src={pen_icon} className="icon_img icon" />
                <span>게시글 작성</span>
                <img src={next_icon} className="icon_img arrow" />
              </li>
            </Link>
            <Link
              to="/mylist"
              onClick={() => {
                setMenuModal(false);
              }}
            >
              <li className="menu">
                <img src={shopping_cart} className="icon_img icon shopping" />
                <span>공구 내역</span>
                <img src={next_icon} className="icon_img arrow" />
              </li>
            </Link>
          </ul>
        </ModalWrapper>
        <div
          className="modal_back"
          onClick={() => {
            setMenuModal(false);
          }}
        ></div>
      </MenuModalArea>
      <ModalBack onClick={handleClickClose}></ModalBack>
    </>
  );
};

export default MenuModal;
