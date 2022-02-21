import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import Chat from '../pages/Chat';
import { Link } from "react-router-dom";
import searchList from '../resource/cityList'
import PasswordModal from './PasswordModal';
import SecessionModal from './SecessionModal';


const Wrapper = styled.div`
  max-width: 1200px;
  /* background-color: powderblue; */
  margin: 50px auto;
  @media screen and (max-width: 767px) {
    margin: 80px auto 30px auto;
    width: 100%;
  }
  .title{
    font-size : 24px;
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
    height: 60px;
    font-size: 16px;
    background-color: salmon;
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
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto;
    }
  }
  .id > div.text, .deal > div.text{
    width: calc(100% - 70px);
    font-size: 18px;
  }
  .spot > div.text{
    width: calc((100% - 150px)/2);
    >select {
      width: 96%;
      height: 40px;
      font-size: 14px;
      line-height: 22px;
    }
    >select.sel_right {
      float: right;
    }
  }
  .md_btn_list {
    padding-top: 20px;
    height: 80px;
    border-top: 1px solid black;
    .md_btn{
      text-align: center;
      font-size: 14px;
      width: calc((100% - 14px)/2);
      height: 40px;
      line-height: 40px;
      float: left;
      background-color: cyan;
      border-radius: 8px;
    }
    >div.password_change_btn{
      float: right;
    }
  }
`;

const Profile = () => {
  // SelectBox 내용
  // const SelectList = ['서울특별시','부산광역시','대구광역시','인천광역시','광주광역시','대전광역시','울산광역시','세종특별자치시'];
  const SelectList = ['서울특별시'];
  // useState로 Input 값 받기
  let [nickName, setNickName] = useState('서버에서받은 닉네임'); // 수정완료된 
  let [inputNickName, setInputNickName] = useState(''); // 수정중
  let [Spot, setSpot] = useState(['서버에서받은 시', ' ' ,'구']); // 수정완료된 
  let [selectCity, setSelectCity] = useState(''); // 수정중
  let [selectDistrict, setSelectDistrict] = useState(''); // 수정중
  
  // useState로 Modal창 On(true)/Off(false)
  let [isPasswordModalOn, setIsPasswordModalOn] = useState(false);
  const handleChangePasswordModalState = (e) => {
    setIsPasswordModalOn(true);
	};
  let [isSecessionModalOn, setIsSecessionModalOn] = useState(false);
  const handleChangeSecessionModalState = (e) => {
    setIsSecessionModalOn(true);
	};
  
  // 시에 따라 구 select box 값 정하는 함수
  const handleChangeCity = (e) => {
    setSelectCity(e.target.value);
    setSelectDistrict('');
	};
  const handleChangeDistrict = (e) => {
    setSelectDistrict(e.target.value);
	};

  // 수정하기btn On(text레이아웃)(default) <-> 수정완료btn On(Input레이아웃)
  let [changeBtnNick, setChangeBtnNick] = useState(false);
  let [changeBtnSpot, setChangeBtnSpot] = useState(false);

  //수정완료btn On :: Input 값 받는 함수
  const handleChangeInputNick = (e) => {
    setInputNickName(e.target.value);
	};

  //if :수정완료btn On, else :수정하기btn On :: 수정완료 버튼 클릭 시 진행되는 함수
  const handleChangeBtnNick = (e) => {
    if(changeBtnNick){
     //inputNickName을 axios로 닉네임 중복검사 해야함.
     // -> nickName(현재 내 닉네임)과 같은경우는 통과
     // -> 다른 사람 닉네임과 같은 경우 alert("중복된 닉네임입니다.")

     // -> 통과된 경우.
      setNickName(inputNickName);
      setChangeBtnNick(!changeBtnNick);  
    } else {
      setChangeBtnNick(!changeBtnNick);  
    }
	};
  const handleChangeBtnSpot = (e) => {
    if (changeBtnSpot){
      if ( selectCity === '' || selectDistrict === ''){
        alert('시와 구를 모두 선택해주세요');
      } else {
        setSpot([selectCity,' ', selectDistrict]);
        setChangeBtnSpot(!changeBtnSpot);
      }
    } else {
      setChangeBtnSpot(!changeBtnSpot);
    }
	};

  // 로그아웃 버튼 클릭 시 진행되는 함수
  const handleChangeAuth = (e) => {
    alert(`로그아웃되었습니다.`);
	};



  return (
    <Wrapper>
      {isPasswordModalOn ? <PasswordModal setIsPasswordModalOn={setIsPasswordModalOn}></PasswordModal> : <div></div> }
      {isSecessionModalOn ? <SecessionModal setIsSecessionModalOn={setIsSecessionModalOn}></SecessionModal> : <div></div> }

      <div className='title'>마이페이지</div>
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
            <div className='text'>YeonYangJae@naver.com</div>
          </li>
          <li className="deal info_area">
            <div className='tt'>거래횟수</div>
            <div className='text'>5번</div>
          </li>
          {
            changeBtnNick ? 
            <li className="nick info_area">
              <div className='tt'>닉네임</div>
              <div className='text'><input type='text' onChange={handleChangeInputNick}/></div>
              <div className='s_btn' onClick={handleChangeBtnNick}>수정<br/>완료</div>
            </li>
          :
            <li className="nick info_area">
              <div className='tt'>닉네임</div>
              <div className='text'>{nickName}</div>
              <div className='s_btn' onClick={handleChangeBtnNick}>수정<br/>하기</div>
            </li>
          }
          {
            changeBtnSpot ? 
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
              <div className='text'>
                <select className='sel_right' name="district" onChange={handleChangeDistrict}>
                  <option value="">구</option>
                  {
                    searchList[0][selectCity] ? 
                    searchList[0][selectCity].map((el, idx) => (
                      <option key={idx} value={el}>{el}</option>
                    )) : <></>
                  }
                </select>
              </div>
              <div className='s_btn' onClick={handleChangeBtnSpot}>수정<br/>완료</div>
            </li>
            :
            <li className="info_area">
              <div className='tt'>장소</div>
              <div className='text'>{Spot}</div>
              <div className='s_btn' onClick={handleChangeBtnSpot}>수정<br/>하기</div>
            </li>
          }
          <li className="md_btn_list info_area">
            <div className='md_btn secession_btn' onClick={handleChangeSecessionModalState}>회원탈퇴</div>
            <div className='md_btn password_change_btn' onClick={handleChangePasswordModalState}>비밀번호 변경</div>
          </li>          
        </UlDiv>
      </div>
      <div
        className="btn"
        onClick={handleChangeAuth}
      >
        <p
          style={{
            textAlign: "center",
          }}
        >
          로그아웃
        </p>
      </div>
    </Wrapper>
  );
};

export default Profile;