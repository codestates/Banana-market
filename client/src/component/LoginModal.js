import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import github_icon from '../icon/github_icon.png';
import google_icon from '../icon/google_icon.png';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setLogout } from '../redux/actions/actions';

axios.defaults.withCredentials = true;

const Login_div = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;

  > .loginmodal {
    width: 480px;
    height: 540px;
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
    > .login_div {
      width: 260px;
      height: 375px;
      box-sizing: border-box;
      margin: 65px auto 0 auto;

      > .loginId {
        width: 252px;
        height: 35px;
        margin: 10px auto;
        outline: none;
        border: 1px solid rgb(0, 0, 0, 0.3);
        outline: 0;
      }
      > .password {
        width: 252px;
        height: 35px;
        margin: 5px auto 15px auto;
        border: 1px solid rgb(0, 0, 0, 0.3);
        outline: 0;
      }

      > .sign_div {
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
      .line {
        width: 257px;
        height: 1px;
        background-color: rgb(0, 0, 0, 0.2);
      }
      .join {
        width: 257px;
        height: 40px;
        border-radius: 3px;
        margin: 35px auto 15px auto;
        background-color: #2b2828;
        cursor: pointer;
        line-height: 40px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
      }

      > .socialjoin {
        position: absolute;
        box-sizing: border-box;
        width: 257px;
        height: 40px;
        border-radius: 3px;
        border: 1px solid #2b2828;
        cursor: pointer;
        line-height: 40px;
        border-radius: 20px;
        .google_icon {
          position: absolute;
          top: 8px;
          left: 60px;
          width: 20px;
          display: inline-block;
        }
        p {
          float: right;
          width: 230px;
          line-height: 40px;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    > .loginmodal {
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
    }
  }
`;

const LoginModal = ({ loginModal, setLoginModal, handleResponseSuccess }) => {
  let setLoginState = useSelector((state) => state.setLoginReducer);
  let dispatch = useDispatch();
  const history = useHistory();
  // useState로 Input 값 받기
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleClickLoginBtn = () => {
    console.log(loginInfo);
    // axios로 idValue, passwordValue전송.
    const { email, password } = loginInfo;
    if (email === '' || password === '') {
      return alert('이메일과 비밀번호를 입력하세요');
    } else {
      axios
        .post(
          'http://localhost:3001/login',
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        )
        .then((data) => {
          console.log(data);
          dispatch(setLogin());
          setLoginModal(!loginModal);
          handleResponseSuccess();
          history.push('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleClickGoogleSocialLoginBtn = () => {
    const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code`;
    window.location.assign(GOOGLE_LOGIN_URL);
  };

  return (
    <Login_div>
      <div className="loginmodal">
        <div className="close" onClick={() => setLoginModal(!loginModal)}>
          &times;
        </div>
        <div className="login_div">
          <p
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#2b2828',
            }}
          >
            LOGIN
          </p>
          <input
            type="text"
            className="loginId"
            placeholder="이메일을 입력해주세요."
            onChange={handleInputValue('email')}
          />
          <input
            className="password"
            // type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={handleInputValue('password')}
          />
          <div className="sign_div" onClick={handleClickLoginBtn}>
            LOGIN
          </div>
          <div className="line"></div>
          <Link to="/signup">
            <div
              className="join"
              onClick={() => {
                setLoginModal(!loginModal);
              }}
            >
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  color: '#FCFCFC',
                  textAlign: 'center',
                }}
              >
                JOIN
              </p>
            </div>
          </Link>
          <div
            className="socialjoin"
            onClick={() => {
              handleClickGoogleSocialLoginBtn();
            }}
          >
            <p
              style={{
                fontSize: '15px',
                fontWeight: '500',
                color: '#2b2828',
                textAlign: 'center',
                marginTop: '0px',
              }}
            >
              <img className="google_icon" src={google_icon} />
              Google 로그인
            </p>
          </div>
        </div>
      </div>
    </Login_div>
  );
};

export default LoginModal;
