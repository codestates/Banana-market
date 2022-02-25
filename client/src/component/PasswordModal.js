import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import check_icon from "../icon/check_icon.png";
import error_icon from "../icon/error_icon.png";
import { useSelector, useDispatch } from 'react-redux'; 
import { setLogin, setLogout, setUpdateUserInfo} from "../redux/actions/actions";

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
        width: 236px;
        height: 35px;
        margin: 5px auto 15px auto;
        border: 1px solid rgb(0, 0, 0, 0.3);
        outline: 0;
      }
      > img{
        width: 16px;
        height: 16px;
        margin-top: 15px;
        display: block;
        float: right;
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
  let setUserInfo = useSelector((state) => state.setUserInfoReducer); 
  let dispatch = useDispatch();
  // useState로 Input 값 받기
  let [inputPassword, setInputPassword] = useState('');
  let [inputNewPassword, setInputNewPassword] = useState('');
  let [inputReNewPassword, setInputReNewPassword] = useState('');
  // 비밀번호 유효성 검사 통과여부
  let [checkNewPassword, setCheckNewPassword] = useState(false);
  let reg = /^(?=.*[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/;
  // 비밀번호 재확인 검사 통과여부
  let [checkReNewPassword, setCheckReNewPassword] = useState(false);
  // 비밀번호 입력 오류 여부
  let [checkPassword, setCheckPassword] = useState(true);

  //Input 값 받는 함수
  const handleChangePassword = (e) => {
    setInputPassword(e.target.value);
    console.log('입력된 비밀번호', e.target.value)
    if(e.target.value !== ''){
      setCheckPassword(true);
    }
	};
  // 비밀번호 유효성 검사 :
  const handleChangeNewPassword = (e) => {
    setInputNewPassword(e.target.value);
    if(true === reg.test(e.target.value)) {
      setCheckNewPassword(true);
    } else {
      setCheckNewPassword(false);
    }
	};
  // 비밀번호 재확인 검사 :
  const handleChangeRePassword = (e) => {
    setInputReNewPassword(e.target.value);
    console.log(inputNewPassword, '확인', e.target.value)
    if(inputNewPassword === e.target.value){
      setCheckReNewPassword(true);
    } else {
      setCheckReNewPassword(false);
    }
	};

  // 확인 버튼 클릭 시 진행되는 함수
  const handleChangeConfirmPassword = (e) => {
    if(checkReNewPassword && checkNewPassword) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/login`,
          {
            email: setUserInfo.email,
            password: inputPassword,
          },
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          axios.patch(
            `${process.env.REACT_APP_API_URL}/users/info`,{
              password: inputNewPassword
            },
            {
              withCredentials: true,
            }
          ).then((res) => {
            console.log('응답', res)
            setIsPasswordModalOn(false); 
            alert('비밀번호가 바뀌었습니다.')
          }).catch((err) => {
            console.log(err)
          });
        })
        .catch((err) => {
          alert('현재 비밀번호를 다시 입력해주세요.')
          setCheckPassword(false);
          console.log(err);
        });
    }
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
            // type="password"
            placeholder="현재 비밀번호를 입력해주세요."
            onChange={handleChangePassword}
          />{checkPassword ? <div></div>
          : <img className='icon' src={error_icon}/>}
          <input
            className="password new_password"
            type="password"
            placeholder="새로운 비밀번호를 입력해주세요."
            onChange={handleChangeNewPassword}
          />
          <img className='icon' src={checkNewPassword ? check_icon : error_icon}/>
          {checkNewPassword ?
          <span className = 'correct_notice'>사용가능한 비밀번호 입니다.</span>
          : <span className = 'error_notice'>비밀번호는 영문, 숫자, 특수문자를 모두 포함해 6~12자 입니다.</span>}
          <input
            className="password"
            type="password"
            placeholder="새 비밀번호를 확인해주세요."
            onChange={handleChangeRePassword}
          />
          <img className='icon' src={checkReNewPassword ? check_icon : error_icon}/>
          <div className="confirm_btn" onClick={handleChangeConfirmPassword}>
            확인
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PasswordModal;
