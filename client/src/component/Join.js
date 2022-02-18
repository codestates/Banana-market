import React, {useState} from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Chat from '../pages/Chat';
import { Link } from "react-router-dom";
import searchList from '../resource/cityList'


const Wrapper = styled.div`
  max-width: 1200px;
  /* background-color: powderblue; */
  margin: 50px auto;
  font-size : 24px;
  @media screen and (max-width: 767px) {
    margin: 80px auto 30px auto;
    width: 100%;
  }
  .title{
    width: 440px;
    margin: 0 auto;
    background-color: red;
    margin-bottom: 15px;
    @media screen and (max-width: 767px) {
      width: 90%;
    }
  }
  .detail {
    width: 440px;
    border: 1px solid #000;
    box-sizing: border-box;
    margin: 0 auto;
    /* background-color: peachpuff; */
    border-radius: 10px;
    @media screen and (max-width: 767px) {
      width: 90%;
    }
    /* padding-top: 20px; */
  }

  .btn {
    width: 440px;
    height: 45px;
    border: 1px solid #000;
    box-sizing: border-box;
    margin: 40px auto 0 auto;
    border-radius: 50px;
    cursor: pointer;
    @media screen and (max-width: 767px) {
      margin: 25px auto 0 auto;
      width: 90%;
    }
  }
`;

const UlDiv = styled.ul`
  width: 380px;
  /* background-color: rebeccapurple; */
  margin: 0 auto;
  border-radius: 10px;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 0;
  }
  .profile {
    width: 285px;
    height: 100px;
    background-color: orange;
    box-sizing: border-box;
    margin: 20px auto;
    .image {
      float: left;
      width: 100px;
      height: 100px;
      border-radius: 50px;
      margin-right: 25px;
      background-color: white;
    }
    .btn_list {
      float: left;
      width: 160px;
      height: 100px;
      .profile_btn{
        width: 100%;
        font-size: 14px;
        height: 40px;
        border-radius: 8px;
        text-align: center;
        line-height: 40px;
        background-color: seagreen;
      }
      .delete_btn{
        margin-top: 20px;
      }
    }
  }
  .info_area {
    width: 380px;
    font-size: 16px;
    background-color: salmon;
    margin-bottom: 20px;
    box-sizing: border-box;
    /* height: 40px; */
    .tt{
      border: 1px solid red;
      width:70px;
      float: left;
    }
    .text{
      border: 1px solid red;
      height: 40px;
      width: calc(100% - 150px);
      float: left;
      >input{
        width:100%;
        height: 40px;
      }
    }
    .s_btn{
      text-align: center;
      font-size: 14px;
      width:70px;
      height: 40px;
      float: right;
      background-color: cyan;
      border-radius: 8px;
    }
    >span{
      font-size: 12px;
      padding-left: 70px;
      display: inline-block;
    }
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto;
    }
  }
  .security_num > div.text{
    width: calc(100% - 70px);
  }
  .spot > div.text{
    width: calc((100% - 80px)/2);
    >select {
      width: 100%;
      height: 40px;
      font-size: 14px;
      line-height: 22px;
    }
  }
  .spot > div.text_right{
      float: right;
  }
  .password > div.text{
    width: calc(100% - 70px);
    height: 90px;
    >input {
      margin-bottom: 10px;
    }
  }
`;

const Join = () => {
  // SelectBox 내용
  // const SelectList = ['서울특별시','부산광역시','대구광역시','인천광역시','광주광역시','대전광역시','울산광역시','세종특별자치시'];
  const SelectList = ['서울특별시'];
  // useState로 Input 값 받기
  let [inputId, setInputId] = useState('');
  let [userId, setUserId] = useState('');
  let [inputSecurityNum, setInputSecurityNum] = useState('');
  let [inputNickname, setInputNickname] = useState('');
  let [userNickname, setUserNickname] = useState('');
  let [inputPassword, setInputPassword] = useState('');
  let [inputRePassword, setInputRePassword] = useState('');
  let [selectCity, setSelectCity] = useState('');
  let [selectDistrict, setSelectDistrict] = useState('');
  
  //Input 값 받는 함수
  const handleChangeId = (e) => {
    setInputId(e.target.value);
	};
  const handleChangeSecurityNum = (e) => {
    setInputSecurityNum(e.target.value);
	};
  const handleChangeNickName = (e) => {
    setInputNickname(e.target.value);
	};
  const handleChangePassword = (e) => {
    setInputPassword(e.target.value);
    // 비밀번호 유효성 검사 
    // -> 통과 : span(사용가능한 비밀번호 입니다.) 
	};
  const handleChangeRePassword = (e) => {
    setInputRePassword(e.target.value);
	};

  // 시에 따라 구 select box 값 정하는 함수
  const handleChangeCity = (e) => {
    setSelectCity(e.target.value);
    setSelectDistrict('');
	};
  const handleChangeDistrict = (e) => {
    setSelectDistrict(e.target.value);
	};

  // 이메일 인증번호확인 버튼 클릭 시 진행되는 함수
  const handleClickSendSecurityNum = (e) => {
    // axios : Id 중복 확인 
    // -> Id 중복일 시 : span(이미 가입된 이메일입니다.), setInputId('')
    // -> Id 통과 시 : setUserId(inputId), 인증번호 전송, span(입력된 이메일로 인증번호가 전송되었습니다.), 
  }
  // 닉네임 중복 확인 시 진행되는 함수 
  const handleClickNickName = (e) => {
    // axios : 닉네임 중복 확인
    // -> 닉네임 중복일 시 : span(이미 사용중인 닉네임 입니다.), setInputNickname('')
    // -> 닉네임 통과 시 : setUserNickname(userNickname), span(사용 가능한 닉네임 입니다.)
  }
  // 가입하기 버튼 클릭 시 진행되는 함수
  const handleClickSubmit = (e) => {
    // axios : 회원가입 제출.
    // if (userId && inputSecurityNum && userNickname && selectCity !== '' && selectDistrict !== '' && inputPassword && inputRePassword )
    // false => alert(입력사항을 모두 기입하세요.)
    // true =>
    // -> Id && 인증번호 매칭 확인 -> 틀리면 alert(인증번호를 확인해주세요), setInputSecurityNum('')
    // -> inputPassword === inputRePassword -> 틀리면 alert(비밀번호를 재확인해주세요), setInputRePassword('')
    console.log(
      userId,
      inputSecurityNum,
      userNickname,
      inputPassword,
      inputRePassword,
      selectCity,
      selectDistrict,
    )
	};

  //임의로 만든 alert창 추후 모달창으로 교체
  const handleChange = (e) => {
    console.log(selectCity, selectDistrict);
    alert(`바나나마켓에 오신 것을 환영합니다!
    로그인 후 서비스를 이용해 주세요 :)`);
	};

  return (
    <Wrapper>
      <div className='title'>회원가입</div>
      <div className="detail">
        <UlDiv>
          <li className="profile">
            <div className="image">
              <img></img>
            </div>
            <div className="btn_list">
              <div className='upload_btn profile_btn'>이미지 업로드</div>
              <div className='delete_btn profile_btn'>삭 제</div>
            </div>
          </li>
          <li className="id info_area">
            <div className='tt'>아아디</div>
            <div className='text'>
              <input type='text' onChange={handleChangeId}/>
            </div>
            <div className='s_btn' onClick={handleClickSendSecurityNum}>인증번호<br/>받기</div>
            <span>아이디로 사용할 이메일을 입력해주세요.</span>
          </li>
          <li className="security_num info_area">
            <div className='tt'>인증번호</div>
            <div className='text'>
              <input type='text' onChange={handleChangeSecurityNum} />
            </div>
            {
              inputSecurityNum !== '' ? <span></span>
              : <span>인증번호를 입력하세요.</span>
            }
          </li>
          <li className="nick info_area">
            <div className='tt'>닉네임</div>
            <div className='text'>
              <input type='text' onChange={handleChangeNickName}/>
            </div>
            <div className='s_btn' onClick={handleClickNickName}>닉네임<br/>중복확인</div>
            <span>중복된 닉네임인지 확인해주세요.</span>
          </li>
          <li className="spot info_area">
            <div className='tt'>장소</div>
            <div className='text'>
              <select name="city" onChange={handleChangeCity}>
                <option value="">시</option>
                {
                  SelectList.map((el, idx) => (
                    <option key={idx} value={el}>{el}</option>
                  ))
                }
              </select>
            </div>
            <div className='text text_right'>
              <select name="district" onChange={handleChangeDistrict}>
                <option value="">구</option>
                {
                  searchList[0][selectCity] ? 
                  searchList[0][selectCity].map((el, idx) => (
                    <option key={idx} value={el}>{el}</option>
                  )) : <></>
                }
              </select>
            </div>
            <span>나의 지역을 선택해주세요.</span>
          </li>
          <li className="password info_area">
            <div className='tt'>비밀번호</div>
            <div className='text'>
              <input type='text'  onChange={handleChangePassword}/>
              <input type='text'  onChange={handleChangeRePassword}/>
            </div>
            <span>비밀번호는 영어, 숫자, 특수문자를 포함해 6글자 이상입니다.</span>
          </li>
        </UlDiv>
      </div>
      <div
        className="btn"
        onClick={handleClickSubmit}
      >
        <p
          style={{
            textAlign: "center",
          }}
        >
          가입하기
        </p>
      </div>
    </Wrapper>
  );
};

export default Join;