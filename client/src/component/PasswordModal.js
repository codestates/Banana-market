import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import github_icon from "../icon/github_icon.png";
import axios from "axios";

axios.defaults.withCredentials = true;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;

  > .password_modal {
    width: 480px;
    background-color: white;
    position: relative;
    top: 15%;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 8px;
    /* background: #fff; */
    border: 1px solid #8b8585;
    > .close {
      width: 28px;
      height: 28px;
      color: #8b8585;
      float: right;
      font-size: 30px;
      cursor: pointer;
    }
    > .title {
      margin-top: 30px;
      width: 260px;
    }
    > .password_change_box {
      width: 260px;
      box-sizing: border-box;
      margin: 30px auto 0 auto;
      > span {
        display: inline-block;
        font-size: 13px;
        line-height: 21px;
        margin-bottom: 15px;
      }
      > .password {
        width: 252px;
        height: 35px;
        margin: 5px auto 15px auto;
        border: 1px solid rgb(0, 0, 0, 0.3);
        outline: 0;
      }
      > input.password.new_password {
        margin-bottom: 5px;
      }

      > .confirm_btn {
        width: 257px;
        height: 40px;
        /* border-radius: 3px; */
        margin: 15px auto 30px auto;
        box-sizing: border-box;
        cursor: pointer;
        line-height: 40px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 15px;
        text-align: center;
        cursor: pointer;
        background-color: rgb(0, 0, 0, 0.1);
        color: rgb(0, 0, 0, 0.5);
        &:hover {
          background-color: #ffd900;
          color: #2b2828;
        }
      }
    }
  }
  @media only screen and (max-width: 768px){
    > .password_modal {
      width: 100%;
      height: 100vh;
      background-color: white;
      position: relative;
      top: 0;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 0px;
      /* background: #fff; */
      border: 1px solid #8b8585;
      .title {
        margin-top: 170px;
      }
    }
  }
`;

const PasswordModal = ({ setIsPasswordModalOn }) => {
  // useState로 Input 값 받기
  let [inputPassword, setInputPassword] = useState('');
  let [inputNewPassword, setInputNewPassword] = useState('');
  let [inputReNewPassword, setInputReNewPassword] = useState('');

  //Input 값 받는 함수
  const handleChangePassword = (e) => {
    setInputPassword(e.target.value);
	};
  const handleChangeNewPassword = (e) => {
    setInputNewPassword(e.target.value);
    // 비밀번호 유효성 검사 : 
    // -> 통과 : span(사용가능한 비밀번호 입니다.) 
	};
  const handleChangeRePassword = (e) => {
    setInputReNewPassword(e.target.value);
	};

  // 확인 버튼 클릭 시 진행되는 함수
  const handleChangeConfirmPassword = (e) => {
    // axios : inputPassword 를 확인 -> 틀리면alert(비밀번호가 틀렸습니다.) , 맞으면()
    // -> if (inputNewPassword === inputReNewPassword) 이라면 비밀번호 변경
    // -> else 변경 비밀번호를 다시 확인해주세요
  }

  return (
    <Wrapper>
      <div className="password_modal">
        <div className="close" onClick={() => setIsPasswordModalOn(false)}>
          &times;
        </div>
        <div className='title'>비밀번호 변경</div>
        <div className="password_change_box">
          <input
            className="password"
            type="password"
            placeholder="현재 비밀번호를 입력해주세요."
            onChange={handleChangePassword}
          />
          <input
            className="password new_password"
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요."
            onChange={handleChangeNewPassword}
          />
          <span>비밀번호는 영어, 숫자, 특수문자를 포함해 6글자 이상입니다.</span>
          <input
            className="password"
            type="password"
            placeholder="새 비밀번호를 확인해주세요."
            onChange={handleChangeRePassword}
          />
          <div className="confirm_btn" onClick={handleChangeConfirmPassword}>
            확인
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PasswordModal;
