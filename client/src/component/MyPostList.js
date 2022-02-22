import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";


const Wrapper = styled.div`
  >div.title{
    max-width: 1200px;
    font-size : 24px;
    margin: 60px auto 15px auto;
    background-color: red;
    @media screen and (max-width: 1200px) {
    margin: 50px 15px 15px 15px;
    }

    @media screen and (max-width: 767px) {
    margin: 75px 10px 10px 10px;
    height: 30px;
    }
  }
`;
const CheckBtn = styled.div`
  max-width: 1200px;
  height: 35px;
  margin: 0px auto 55px auto;
  /* background-color: sienna; */
  @media screen and (max-width: 1200px) {
    margin: 0px 15px 15px 15px;
  }

  @media screen and (max-width: 767px) {
    margin: 0px 10px 10px 10px;
    height: 30px;
  }

  .Check_wrapper {
    min-width: 140px;
    height: 35px;
    margin-left: 5px;
    border-radius: 10px;
    float: right;

    @media screen and (max-width: 1200px) {
      margin-left: 0;
    }
    @media screen and (max-width: 767px) {
      min-width: 120px;
      height: 30px;
    }
    >label{
      display: inline-block;
      font-size: 20px;
      background-color: red;
      >input[type='checkbox']{
        appearance: none;
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid black;
      }
      >input[type='checkbox']:checked {
        appearance: none;
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid black;
        background-color: blue;
      }
    }
  }
`;

const ListDiv = styled.div`
  max-width: 1200px;
  height: 100%;
  /* background-color: aquamarine; */
  margin: 0 auto;

  > ul {
    max-width: 1200px;
    margin: 0px auto 70px auto;
    display: grid;
    grid-template-columns: auto auto;
    padding: 5px;

    grid-gap: 30px;
    /* background-color: ChatList; */

    @media screen and (max-width: 1200px) {
      grid-template-columns: auto auto;
      grid-gap: 25px;
      padding: 15px;
      margin: 35px auto 80px auto;
    }

    @media screen and (max-width: 768px) {
      grid-template-columns: auto;
      grid-gap: 15px;
      padding: 10px;
      margin: 0 auto 20px auto;
    }

    > .list_detail {
      box-shadow: 2px 3px 4px 2px #ddd;
      /* min-width: 379px; */
      min-height: 140px;

      border-radius: 10px;
      cursor: pointer;
      background-color: #fff;
      /* margin-bottom: 25px; */
      transition: all 0.2s linear;
      &:hover {
        opacity: 0.4;
      }
      @media screen and (max-width: 1200px) {
        /* min-width: 300px; */
        min-height: 130px;
      }

      @media screen and (max-width: 768px) {
        min-height: 130px;
      }
      > .in_grid {
        display: grid;
        grid-template-columns: 120px auto;
        padding: 15px;
        grid-gap: 15px;
        @media screen and (max-width: 1200px) {
          grid-template-columns: 115px auto;
        }

        @media screen and (max-width: 768px) {
          grid-template-columns: 110px auto;
        }

        .img {
          min-height: 120px;
          /* border: 1px solid #fff; */
          background-color: #ddd;
          border-radius: 10px;
          @media screen and (max-width: 1200px) {
            /* min-width: 300px; */
            min-height: 115px;
          }

          @media screen and (max-width: 768px) {
            min-height: 110px;
          }
        }

        .inf {
          min-height: 120px;
          /* border: 1px solid #fff; */
          border-radius: 10px;
          cursor: pointer;
          @media screen and (max-width: 1200px) {
            /* min-width: 300px; */
            min-height: 115px;
          }

          @media screen and (max-width: 768px) {
            min-height: 110px;
          }

          .title {
            width: 100%;
            min-height: 19px;
            /* background-color: beige; */
            font-size: 19px;
            margin-top: 7px;
            font-weight: 500;
            color: #2b2828;
            @media screen and (max-width: 1200px) {
              /* min-width: 300px; */
              font-size: 17px;
            }

            @media screen and (max-width: 768px) {
              font-size: 16px;
              margin-top: 8px;
            }
          }
          .location {
            width: 100%;
            font-size: 15px;
            margin-top: 10px;
            color: #2b2828;
            @media screen and (max-width: 768px) {
              font-size: 14px;
            }
          }
          .date {
            width: 100%;
            font-size: 13px;
            margin-top: 12px;
            color: #2b2828;

            @media screen and (max-width: 768px) {
              font-size: 12px;
            }
          }
          .pepole {
            width: 100%;
            font-size: 13px;
            margin-top: 5px;
            color: #2b2828;

            @media screen and (max-width: 768px) {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
`;

const List = () => {
  const history = useHistory();
  const fakelist = [1, 2, 3, 4, 1, 2, 3, 4, 6, 7];
  const [list, setList] = useState(fakelist);

  // useState로 Input 값 받기
  let[isChecked, setIsChecked] = useState(false);

  // Input 값 받는 함수
  const handleChangeCheckBox = (e) => {
    setIsChecked(!isChecked);
    //isChecked가 true이면 : axios 내가 쓴 글만 요청
    //isChecked가 false이면 : axios 내가 참여한 모든 공구 요청
  }


  return (
    <Wrapper>
      <div className='title'>내가 참여한 공구</div>
      <CheckBtn>
        <div className="Check_wrapper">
          <label htmlFor="ownPost" onClick={handleChangeCheckBox}>
            <input type="checkbox" id="ownPost"/> 
            &nbsp;&nbsp;내가 쓴 글만 보기
          </label>
        </div>
      </CheckBtn>
      <ListDiv>
        <ul>
          {list.map((el, idx) => (
            <li
              className="list_detail"
              onClick={() => {
                history.push("/view");
              }}
            >
              <ul className="in_grid">
                <li className="img"></li>
                <li className="inf">
                  <ul>
                    <li className="title">[공구] 사과 공구 같이하실 분</li>
                    <li className="location">하나마트</li>
                    <li className="date">2월 28월 (월) &#124; 오후</li>
                    <li className="pepole">지금 2명 &#124; 전체 3명</li>
                  </ul>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </ListDiv>
    </Wrapper>
  );
};

export default List;