import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import logo from "../icon/logo.png";
import close from "../icon/close.png";

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
  background: white;
  .announcement {
    text-align: left;
    padding-left: 22px;
    margin-top: 10px;
    position: relative;
    line-height: 30px;
  }
  .menulist {
    padding: 20px 22px;
  }
  .menu {
    height: 60px;
    background-color: red;
    margin-bottom: 10px;
    .icon_img {
      margin-top: 21px;
      height: 22px;
      /* background-color: white; */
    }
    .icon {
      margin-right: 20px;
    }
    .arrow {
      float: right;
    }
    > span {
      line-height: 50px;
    }
  }

  @media only screen and (min-width: ${BREAK_POINT_TABLET}px) {
    width: 450px;
    padding: 0;
    background-color: purple;
    position: static;
    float: right;

    > div .logo {
      display: none;
    }
    .menu_wrapper {
      .icon.menu_icon {
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

const MenuModal = ({ setMenuModal, setLoginModal }) => {
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
              <img src={logo} className="logo_icon" />
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
            <span
              onClick={() => {
                setMenuModal(false);
                setLoginModal(true);
              }}
            >
              로그인 후 이용해주세요
            </span>
          </div>
          <ul className="menulist">
            <Link to="/mypage">
              <li
                className="menu"
                onClick={() => {
                  setMenuModal(false);
                }}
              >
                <img src={close} className="icon_img icon" />
                <span>마이페이지</span>
                <img src={close} className="icon_img arrow" />
              </li>
            </Link>
            <Link
              to="/posting"
              onClick={() => {
                setMenuModal(false);
              }}
            >
              <li className="menu">
                <img src={close} className="icon_img icon" />
                <span>게시글 작성</span>
                <img src={close} className="icon_img arrow" />
              </li>
            </Link>
            <Link
              to="/mylist"
              onClick={() => {
                setMenuModal(false);
              }}
            >
              <li className="menu">
                <img src={close} className="icon_img icon" />
                <span>공구 내역</span>
                <img src={close} className="icon_img arrow" />
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
