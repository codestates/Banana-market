import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux'; 
import { setLogin, setLogout, setUpdateUserInfo} from "../redux/actions/actions";

import Chat from '../pages/Chat';
import { Link } from "react-router-dom";
import searchList from '../resource/cityList'
import PasswordModal from './PasswordModal';
import SecessionModal from './SecessionModal';
import monkey from "../icon/monkey.png";


const Wrapper = styled.div`
  max-width: 1200px;
  /* background-color: powderblue; */
  margin: 50px auto;
  @media screen and (max-width: 767px) {
    margin: 80px auto 30px auto;
    width: 100%;
  }
  .title{
    font-size : 18px;
    width: 440px;
    margin: 0 auto;
    font-weight: 600;
    /* background-color: red; */
    margin-bottom: 26px;
    position: relative;
    @media screen and (max-width: 767px) {
      width: 90%;
    }
  }
  .title::after{
    content : '';
    background-color: rgba(0, 0, 0, 0.15);
    position: absolute;
    left: 0px;
    bottom: -10px;
    width: 440px;
    height: 1px;
    z-index: -1;
    @media screen and (max-width: 767px) {
      width: 100%;
    }
  }
  .detail {
    width: 440px;
    border: 1px solid rgba(0, 0, 0, 0.1);
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
    line-height: 45px;
    text-align: center;
    box-sizing: border-box;
    margin: 25px auto 0 auto;
    border-radius: 50px;
    cursor: pointer;
    font-size: 14px;
    color: white;
    background-color: #95c710;
    font-weight: 600;
    @media screen and (max-width: 767px) {
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
    /* background-color: orange; */
    box-sizing: border-box;
    margin: 50px auto;
    .image {
      float: left;
      width: 100px;
      height: 100px;
      border-radius: 50px;
      margin-right: 25px;
      background-color: rgba(255, 250, 176, 0.8);
      border: 1px solid rgba(0, 0, 0, 0.1);
      overflow: hidden;
      > img.basic_image {
        display: inline-block;
        width: 100%;
        height: 100%;
      }
    }
    .btn_list {
      margin-top: 8px;
      float: left;
      width: 160px;
      height: 88px;
      .profile_btn{
        display: inline-block;
        width: 100%;
        font-size: 14px;
        height: 36px;
        border-radius: 100px;
        text-align: center;
        line-height: 36px;
        background-color: #95c710;
        color: rgba(255, 255, 255, 0.9);
        font-weight: 600;
        >input.input_hidden{
          display: none;
        }
      }
      .profile_btn.delete_btn{
        border: 1px solid rgba(0, 0, 0, 0.1);
        color: rgba(0, 0, 0, 0.6);
        background-color: white;
        margin-top: 16px;
      }
    }
  }
  .info_area {
    width: 380px;
    height: 60px;
    font-size: 15px;
    /* background-color: salmon; */
    box-sizing: border-box;
    /* height: 40px; */
    .tt{
      /* border: 1px solid red; */
      width:70px;
      float: left;
      font-weight:600;
      opacity: 0.5;
    }
    .text{
      /* border: 1px solid red; */
      color: rgba(0, 0, 0, 0.5);
      height: 40px;
      width: calc(100% - 150px);
      float: left;
      >input{
        width:100%;
        height: 40px;
      }
    }
    .s_btn{
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      width:70px;
      height: 30px;
      float: right;
      border-radius: 100px;
      border:  1px solid #95c710;
      color: #95c710;
    }
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto;
    }
  }
  .id > div.text, .deal > div.text{
    width: calc(100% - 70px);
    font-size: 16px;
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
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    .md_btn{
      text-align: center;
      font-size: 14px;
      width: calc((100% - 14px)/2);
      height: 40px;
      line-height: 40px;
      float: left;
      background-color: rgba(0, 0, 0, 0.15);
      color: white;
      font-weight: 600;
      border-radius: 100px;
    }
    >div.password_change_btn{
      background-color: #95c710;
      color: rgba(255, 255, 255, 0.9);
      float: right;
    }
  }
`;

const Profile = ({handleChangeAuth}) => {
  let setLoginState = useSelector((state) => state.setLoginReducer); 
  let setUserInfo = useSelector((state) => state.setUserInfoReducer); 
  let dispatch = useDispatch();
  // SelectBox 내용
  const SelectList = ['서울특별시'];
  // // useState로 Input 값 받기
  let [inputNickName, setInputNickName] = useState(''); // 수정중
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
      if(inputNickName === '' || inputNickName === setUserInfo.nickName) {
        setChangeBtnNick(!changeBtnNick);
      }else {
        //inputNickName을 axios로 닉네임 중복검사 해야함.
        axios.post(
          `${process.env.REACT_APP_API_URL}/validation/name`,{
            name: inputNickName
          },
          {
            withCredentials: true,
          }
        ).then((res) => {
          //닉네임 수정요청
          axios.patch(
            `${process.env.REACT_APP_API_URL}/users/info`,{
              name: inputNickName
            },
            {
              withCredentials: true,
            }
          ).then((res) => {
            dispatch({type: 'SET_USER_INFO_NICKNAME', payload: inputNickName });
            setChangeBtnNick(!changeBtnNick); 
          }).catch((err) => {
            console.log(err)
          })
        }).catch((err) => {
          alert('중복된 닉네임입니다');
          console.log(err)
        })
      }
	};
  const handleChangeBtnSpot = (e) => {
    if (changeBtnSpot){
      if ( selectCity === '' || selectDistrict === ''){
      } else {
        axios.patch(
          `${process.env.REACT_APP_API_URL}/users/info`,{
            region: selectDistrict
          },
          {
            withCredentials: true,
          }
        ).then((res) => {
          dispatch({type: 'SET_USER_INFO_REGION', payload: selectDistrict});
          setChangeBtnSpot(!changeBtnSpot); 
        }).catch((err) => {
          console.log(err)
        })
      }
    } setChangeBtnSpot(!changeBtnSpot);
	};

  //이미지 업로드 버튼 실행함수
  const handleChangeUpload = (e) => {
    const uploadFile = e.target.files[0]
    const formData = new FormData();
    formData.append('profileImage', uploadFile);
    const config = {
      Headers: {
        'content-type': 'multipart/form-data',
      },
      withCredentials: true,
    }
    console.log('formData',formData)
      if (formData) {        
        axios.put(
          `${process.env.REACT_APP_API_URL}/users/profile-image`, formData, config
        ).then((res) => {
          axios
            .get(`${process.env.REACT_APP_API_URL}/users/info`, {
              withCredentials: true,
            })
            .then((res) => {
              dispatch({type: 'SET_UPDATE_USER_INFO' , payload: res.data.data });
            })
            .catch((err) => {
              dispatch(setLogout());
            });
        }).catch((err) => {
          console.log(err)
        })
      }
    };
  //이미지 삭제버튼 실행함수
  const handleClickDeleteImg = (e) => {
    axios.delete(
      `${process.env.REACT_APP_API_URL}/users/profile-image`, {
        withCredentials: true,
      }
    ).then((res) => {
      dispatch({type: 'SET_USER_INFO_PROFILE_IMG_NULL'});
      document.getElementById('image').value = '';
    }).catch((err) => {
      console.log(err)
    })
  }

  //페이지 리로딩시 값 default로 설정하기
  useEffect(() => {
    console.log('setUserInfo함')
    setInputNickName('');
  },[setUserInfo])

  return (
    <Wrapper>
      {isPasswordModalOn ? <PasswordModal setIsPasswordModalOn={setIsPasswordModalOn}></PasswordModal> : <div></div> }
      {isSecessionModalOn ? <SecessionModal setIsSecessionModalOn={setIsSecessionModalOn}></SecessionModal> : <div></div> }
      <div className='title'>마이페이지</div>
      <div className="detail">
        <UlDiv>
          <li className="profile">
            <div className="image">
                { setUserInfo.profileImage? <img className="basic_image" src={setUserInfo.profileImage} />
                : <img className="basic_image" src={monkey}/>
                }
            </div>
            <div className="btn_list">
                <label htmlFor='image' className='upload_btn profile_btn'>
                  <input id='image' type='file' accept='image/*' className='input_hidden' onChange={handleChangeUpload}/>
                  이미지 업로드
                </label>
                <div className='delete_btn profile_btn' onClick={handleClickDeleteImg}>이미지 제거</div>
              </div>
          </li>
          <li className="id info_area">
            <div className='tt'>아아디</div>
            <div className='text'>{setUserInfo.email}</div>
          </li>
          <li className="deal info_area">
            <div className='tt'>거래횟수</div>
            <div className='text'>{setUserInfo.totalTrade} 번</div>
          </li>
          {
            changeBtnNick ? 
            <li className="nick info_area">
              <div className='tt'>닉네임</div>
              <div className='text'><input type='text' onChange={handleChangeInputNick} placeholder={setUserInfo.nickName}/></div>
              <div className='s_btn' onClick={handleChangeBtnNick}>수정완료</div>
            </li>
          :
            <li className="nick info_area">
              <div className='tt'>닉네임</div>
              <div className='text'>{setUserInfo.nickName}</div>
              <div className='s_btn' onClick={handleChangeBtnNick}>수정</div>
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
              <div className='s_btn' onClick={handleChangeBtnSpot}>수정완료</div>
            </li>
            :
            <li className="info_area">
              <div className='tt'>장소</div>
              <div className='text'>서울특별시, &nbsp; {setUserInfo.region}</div>
              <div className='s_btn' onClick={handleChangeBtnSpot}>수정</div>
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
        <p>
          로그아웃
        </p>
      </div>
    </Wrapper>
  );
};

export default Profile;