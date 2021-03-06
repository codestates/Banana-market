import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Chat from '../pages/Chat';
import { Link } from 'react-router-dom';
import searchList from '../resource/cityList';
import { ReactComponent as CheckIcon1 } from '../icon/check_icon.svg';
import { ReactComponent as CheckIcon2 } from '../icon/check_icon.svg';
import next_icon from '../icon/next_icon.png';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLogin,
  setLogout,
  setUpdateUserInfo,
} from '../redux/actions/actions';
import PersonalInformModal from './PersonalInformModal';
import axios from 'axios';

const Wrapper = styled.div`
  max-width: 1200px;
  /* background-color: powderblue; */
  margin: 50px auto;
  font-size: 18px;
  color: #444;
  @media screen and (max-width: 767px) {
    margin: 80px auto 30px auto;
    width: 100%;
  }
  .detail {
    width: 440px;
    border: 1px solid #ecede8;
    box-sizing: border-box;
    margin: 0 auto;
    padding-top: 40px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 1px 1px 5px 0px #00000014;
    @media screen and (max-width: 767px) {
      width: 90%;
      height: auto;
    }
    /* padding-top: 20px; */
  }

  .btn {
    width: 440px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    font-weight: 500;
    box-sizing: border-box;
    margin: 20px auto 0 auto;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 1px 1px 5px 0px #00000014;
    border: 0px;
    background-color: #a1d026;
    color: #fbfff1;
    cursor: pointer;
    /* border: 1px solid #eaeaea;
    background-color: #ececec;
    color: #aeaeae;
    &:hover{
      border: 0px;
      background-color:#a1d026;
      color:#fbfff1;
    } */
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
  .pi_inform {
    background-color: #f7f7f7;
    padding: 15px 10px 15px 20px;
    border-radius: 10px;

    > input {
      margin-top: 3px;
      position: relative;
      top: 8px;
    }
    > span#check_pi_inform {
      font-size: 16px;
      line-height: 16px;
      color: #444;
      padding-left: 0px;
      @media screen and (max-width: 450px) {
        font-size: 13px;
      }
    }
    > div {
      margin-left: 25px;
      font-size: 13px;
      width: 100px;
      height: 30px;
      color: #0075ff;
      border: 1px solid #0075ff;
      border-radius: 100px;
      text-align: center;
      line-height: 30px;
      margin-top: 20px;
    }
  }
  > li.info_area {
    display: block;
    width: 380px;
    height: auto;
    font-size: 16px;
    /* background-color: salmon; */
    margin-bottom: 40px;
    box-sizing: border-box;
    /* height: 40px; */
    .tt {
      /* border: 1px solid red; */
      font-size: 14px;
      font-weight: 400;
      color: #818181;
      width: 60px;
      float: left;
      padding-top: 18px;
    }
    .text {
      /* border: 1px solid red; */
      height: 45px;
      width: calc(100% - 140px);
      float: left;
      > input {
        font-size: 18px;
        width: 100%;
        height: 45px;
        color: black;
      }
    }
    .s_btn {
      text-align: center;
      font-size: 12px;
      font-weight: 500;
      width: 70px;
      height: 40px;
      float: right;
      color: #fbfff1;
      background-color: #a1d026;
      border-radius: 8px;
      padding-top: 6px;
    }
    > span {
      position: relative;
      top: 8px;
      font-size: 12px;
      padding-left: 60px;
      display: inline-block;
      color: #a1d026;
      /* background-color: green; */
    }
    > span.error_message {
      color: #ffc004;
    }
    > div.hidden {
      height: 40px;
    }
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto 20px auto;
    }
  }
  .security_num > div.text {
    width: calc(100% - 70px);
  }
  .spot > div.text {
    width: calc((100% - 80px) / 2);
    > select {
      width: 100%;
      height: 45px;
      font-size: 16px;
      line-height: 22px;
    }
  }
  .spot > div.text_right {
    float: right;
  }
  > li.info_area.password {
    > div.text {
      width: calc(100% - 60px);
      > input.password {
        display: block;
        width: calc(100% - 20px);
        float: left;
      }
      svg {
        width: 16px;
        height: 16px;
        margin-top: 12px;
        display: block;
        float: right;
      }
    }
    > span {
      font-size: 12px;
      padding-left: 60px;
      display: inline-block;
      /* background-color: green; */
      margin-bottom: 8px;
      /* width: 100%;
      height: auto;
      background-color: yellow;
      display: block; */
    }
    > div.text_right {
      width: 100%;
      height: 45px;
      padding-left: 60px;
      /* background-color: red; */
      > input.password {
        font-size: 18px;
        margin-top: 8px;
        display: block;
        width: calc(100% - 20px);
        float: left;
      }
      svg {
        width: 16px;
        height: 16px;
        margin-top: 12px;
        display: block;
        float: right;
      }
    }
  }
`;

const Join = () => {
  const history = useHistory();
  let setLoginState = useSelector((state) => state.setLoginReducer);
  let setUserInfo = useSelector((state) => state.setUserInfoReducer);
  let dispatch = useDispatch();
  // SelectBox ??????
  const SelectList = ['???????????????'];
  // useState??? Input ??? ??????
  let [inputId, setInputId] = useState('');
  let [inputNickname, setInputNickname] = useState('');
  let [imgBase64, setImgBase64] = useState(null);

  // ????????????
  let [checkEmail, setCheckEmail] = useState(false); // ????????? ????????? ?????? ????????????
  let regEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  let [checkNickname, setCheckNickname] = useState(true); // ????????? ?????? ?????? ??????
  let [isCheckedNickname, setIsCheckedNickname] = useState(false); // ????????? ?????? ???
  let [checkNewPassword, setCheckNewPassword] = useState(false); // ???????????? ????????? ?????? ????????????
  let regPassword = /^(?=.*[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,12}$/;
  let [checkReNewPassword, setCheckReNewPassword] = useState(false); // ???????????? ????????? ?????? ????????????

  // OK ??? ??? (?????? ?????? ???)
  let [userId, setUserId] = useState('');
  let [inputSecurityNum, setInputSecurityNum] = useState(null);
  let [userNickname, setUserNickname] = useState('');
  let [selectCity, setSelectCity] = useState('');
  let [selectDistrict, setSelectDistrict] = useState('');
  let [inputNewPassword, setInputNewPassword] = useState('');
  let [securityNum, setSecurityNum] = useState(null);
  let [profileImg, setProfileImg] = useState(null);

  // PersonalInformModal On / Off
  let [personalInformModal, setPersonalInformModal] = useState(false);
  let [piCheck, setPiCheck] = useState(false); // ???????????????????????? ????????????

  //----------------------?????????-----------------------
  //????????? ????????? ?????? ????????????
  const handleChangeUpload = (e) => {
    const uploadFile = e.target.files[0];
    setThumbnail(uploadFile); // ????????? ?????????
    const formData = new FormData();
    formData.append('profileImage', uploadFile);
    setProfileImg(formData);
  };
  //????????? ???????????? ????????????
  const handleClickDeleteImg = (e) => {
    setProfileImg(null);
  };
  // ????????? ????????? ??????
  const setThumbnail = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImgBase64(reader.result);
        resolve();
      };
    });
  };

  //----------------------?????????-----------------------
  // ????????? ????????? ?????? :
  const handleChangeId = (e) => {
    setInputId(e.target.value);
    if (e.target.value !== '') {
      if (true === regEmail.test(e.target.value)) {
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
      }
    } else {
      setCheckEmail('?????????');
    }
  };
  // ????????? ?????????????????? ?????? ?????? ??? ???????????? ??????
  const handleClickSendSecurityNum = (e) => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/validation/email`,
        {
          email: inputId,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        alert('???????????? ??????????????? ?????????????????????');
        // ????????? ???????????? ??????
        setSecurityNum(res.data.data.authorizationNum);
        setUserId(inputId);
        // ????????? ??????
      })
      .catch((err) => {
        console.log(err);
        let result = String(err);
        if (result.includes('409')) alert('????????? ??????????????????');
        else if (result.includes('500')) alert('?????????????????????');
      });
  };
  // ???????????? ?????? ??????
  const handleChangeSecurityNum = (e) => {
    console.log(e.target.value);
    console.log(
      'securityNum',
      securityNum,
      Number(securityNum) === Number(e.target.value)
    );
    setInputSecurityNum(e.target.value);
  };

  //----------------------?????????-----------------------
  // ????????? ?????? ??????
  const handleChangeNickName = (e) => {
    if (userNickname !== e.target.value) setIsCheckedNickname(false);
    else if (e.target.value === '') setIsCheckedNickname(false);
    else setIsCheckedNickname(true);
    setInputNickname(e.target.value);
  };

  // ????????? ?????? ?????? ??? ???????????? ??????
  const handleClickNickName = (e) => {
    setIsCheckedNickname(true);
    if (inputNickname !== '') {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/validation/name`,
          {
            name: inputNickname,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          setCheckNickname(true);
          setUserNickname(inputNickname);
        })
        .catch((err) => {
          console.log(err);
          let result = String(err);
          if (result.includes('409')) setCheckNickname(false);
          else if (result.includes('500')) setIsCheckedNickname(false);
        });
    }
  };
  //----------------------??????-----------------------
  // ?????? ?????? ??? select box ??? ????????? ??????
  const handleChangeCity = (e) => {
    setSelectCity(e.target.value);
    setSelectDistrict('');
  };
  const handleChangeDistrict = (e) => {
    setSelectDistrict(e.target.value);
  };
  //----------------------????????????-----------------------
  // ???????????? ????????? ?????? :
  const handleChangeNewPassword = (e) => {
    setInputNewPassword(e.target.value);
    if (true === regPassword.test(e.target.value)) {
      setCheckNewPassword(true);
    } else {
      setCheckNewPassword(false);
    }
  };
  // ???????????? ????????? ?????? :
  const handleChangeRePassword = (e) => {
    if (inputNewPassword === e.target.value) {
      setCheckReNewPassword(true);
    } else {
      setCheckReNewPassword(false);
    }
  };

  //----------------------????????????-----------------------
  // ???????????? ?????? ?????? ??? ???????????? ??????
  const handleClickSubmit = (e) => {
    if (piCheck) {
      if (securityNum && Number(securityNum) === Number(inputSecurityNum)) {
        if (
          inputId === userId &&
          inputNickname === userNickname &&
          checkNewPassword &&
          checkReNewPassword &&
          selectDistrict !== ''
        ) {
          // console.log(inputId, userId, inputNickname,userNickname, checkNewPassword, checkReNewPassword, selectDistrict  )
          //1.????????????
          axios
            .post(
              `${process.env.REACT_APP_API_URL}/signup`,
              {
                email: userId,
                password: inputNewPassword,
                region: selectDistrict,
                name: userNickname,
              },
              {
                withCredentials: true,
              }
            )
            .then((res) => {
              //???????????? ??????
              alert(`??????????????? ??????????????? ?????????????????????.`);
            })
            .catch((err) => {
              // ???????????? ??????
              alert(`??????????????? ??????????????????.`);
              setCheckNickname(false);
              console.log(err);
            });
        } else {
          alert(
            '?????? ????????? ?????? ????????????. ?????????, ?????????, ????????????, ??????????????? ?????? ??????????????? ?????????.'
          );
        }
      } else {
        alert('????????? ????????? ??????????????????');
      }
    } else {
      alert('??????????????????????????? ????????? ?????????????????????.');
    }
  };

  //????????? ?????? alert??? ?????? ??????????????? ??????
  const handleChange = (e) => {
    console.log(selectCity, selectDistrict);
    alert(`?????????????????? ?????? ?????? ???????????????!
    ????????? ??? ???????????? ????????? ????????? :)`);
  };

  return (
    <>
      {personalInformModal ? (
        <PersonalInformModal
          setPersonalInformModal={setPersonalInformModal}
          setPiCheck={setPiCheck}
        ></PersonalInformModal>
      ) : (
        <div></div>
      )}
      <Wrapper>
        <div className="detail">
          <UlDiv>
            <li className="id info_area">
              <div className="tt">?????????</div>
              <div className="text">
                <input
                  className="input_css2"
                  type="text"
                  onChange={handleChangeId}
                  placeholder="???????????? ??????????????????"
                />
              </div>
              <div className="s_btn" onClick={handleClickSendSecurityNum}>
                ????????????
                <br />
                ??????
              </div>
              {inputId === '' ? (
                <span className="error_message">???????????? ?????????????????? </span>
              ) : checkEmail ? (
                <span>????????? ????????? ?????????</span>
              ) : (
                <span className="error_message">
                  ???????????? ?????? ????????? ?????????
                </span>
              )}
            </li>
            <li className="security_num info_area">
              <div className="tt">????????????</div>
              <div className="text">
                <input
                  className="input_css2"
                  type="text"
                  onChange={handleChangeSecurityNum}
                />
              </div>
              {inputSecurityNum !== '' ? (
                <div className="hidden"></div>
              ) : (
                <span className="error_message">??????????????? ???????????????</span>
              )}
            </li>
            <li className="nick info_area">
              <div className="tt">?????????</div>
              <div className="text">
                <input
                  className="input_css2"
                  type="text"
                  onChange={handleChangeNickName}
                />
              </div>
              <div className="s_btn" onClick={handleClickNickName}>
                ?????????
                <br />
                ????????????
              </div>
              {isCheckedNickname ? (
                checkNickname ? (
                  <span>??????????????? ?????????????????? </span>
                ) : (
                  <span className="error_message">????????? ?????????????????? </span>
                )
              ) : (
                <span className="error_message">
                  ????????? ??????????????? ??????????????????
                </span>
              )}
            </li>
            <li className="spot info_area">
              <div className="tt">??????</div>
              <div className="text">
                <select
                  className="select_css2"
                  name="city"
                  onChange={handleChangeCity}
                >
                  <option value="">???</option>
                  {SelectList.map((el, idx) => (
                    <option key={idx} value={el}>
                      {el}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text text_right">
                <select
                  className="select_css2"
                  name="district"
                  onChange={handleChangeDistrict}
                >
                  <option value="">???</option>
                  {searchList[0][selectCity] ? (
                    searchList[0][selectCity].map((el, idx) => (
                      <option key={idx} value={el}>
                        {el}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
              </div>
              {selectDistrict === '' ? (
                <span className="error_message">?????? ????????? ??????????????????.</span>
              ) : (
                <div className="hidden"></div>
              )}
            </li>
            <li className="password info_area">
              <div className="tt">????????????</div>
              <div className="text">
                <input
                  className="input_css2 password"
                  type="password"
                  placeholder="??????????????? ??????????????????."
                  onChange={handleChangeNewPassword}
                />
                {checkNewPassword ? (
                  <CheckIcon1 stroke="#a1d026"></CheckIcon1>
                ) : (
                  <CheckIcon1 stroke="#ececec"></CheckIcon1>
                )}
              </div>
              {checkNewPassword ? (
                <span>??????????????? ???????????? ?????????.</span>
              ) : (
                <span className="error_message">
                  ??????????????? ??????, ??????, ??????????????? ?????? ????????? 6~12??? ?????????.
                </span>
              )}
              <div className="text_right">
                <input
                  className="input_css2 password"
                  type="password"
                  placeholder="??????????????? ??????????????????."
                  onChange={handleChangeRePassword}
                />
                {checkReNewPassword ? (
                  <CheckIcon2 stroke="#a1d026"></CheckIcon2>
                ) : (
                  <CheckIcon2 stroke="#ececec"></CheckIcon2>
                )}
              </div>
            </li>
            <li className="pi_inform info_area">
              <input
                id="check_pi_inform"
                type="checkbox"
                checked={piCheck}
                onClick={() => {
                  setPiCheck(!piCheck);
                }}
              />
              <span
                id="check_pi_inform"
                onClick={() => {
                  setPiCheck(!piCheck);
                }}
              >
                &nbsp;&nbsp; ??????????????? ??????????????????????????? ??????(??????)
              </span>
              <div
                className="pi_btn"
                onClick={() => {
                  setPersonalInformModal(true);
                }}
              >
                {' '}
                ????????????
              </div>
            </li>
          </UlDiv>
        </div>
        <div className="btn" onClick={handleClickSubmit}>
          <p
            style={{
              textAlign: 'center',
            }}
          >
            ????????????
          </p>
        </div>
      </Wrapper>
    </>
  );
};

export default Join;
