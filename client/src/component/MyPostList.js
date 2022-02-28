import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
const Wrapper = styled.div`
  > div.title {
    max-width: 1200px;
    font-size: 20px;
    margin: 80px auto 15px auto;
    /* background-color: red; */
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
  margin: 0px auto 40px auto;
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
    > label {
      display: inline-block;
      font-size: 17px;
      /* background-color: red; */
      > input[type='checkbox'] {
        appearance: none;
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid #cbcbcb;
        cursor: pointer;
      }
      > input[type='checkbox']:checked {
        appearance: none;
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 1px solid #cbcbcb;
        background-color: #ddd;
      }
      div {
        float: right;
        margin-left: 15px;
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
          img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
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
            font-size: 17px;
            margin-top: 10px;
            font-weight: 500;
            color: #2b2828;
            @media screen and (max-width: 1200px) {
              /* min-width: 300px; */
              font-size: 17px;
              margin-top: 8px;
            }

            @media screen and (max-width: 768px) {
              font-size: 16px;
              margin-top: 6px;
            }
          }
          .location {
            width: 100%;
            font-size: 14px;
            margin-top: 13px;
            color: #2b2828;
            @media screen and (max-width: 768px) {
              font-size: 14px;
            }
          }
          .date {
            width: 100%;
            font-size: 12px;
            margin-top: 20px;
            color: #2b2828;

            @media screen and (max-width: 768px) {
              font-size: 12px;
            }
          }
          .pepole {
            width: 100%;
            font-size: 12px;
            margin-top: 7px;
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

const List = ({ handleChangeCheckBox }) => {
  const history = useHistory();
  const list = useSelector((state) => state.myPostListReducer);

  return (
    <Wrapper>
      <div className="title">내가 참여한 공구</div>
      <CheckBtn>
        <div className="Check_wrapper">
          <label htmlFor="ownPost" onClick={handleChangeCheckBox}>
            <input type="checkbox" id="ownPost" />
            <div>내가 쓴 글만 보기</div>
          </label>
        </div>
      </CheckBtn>
      <ListDiv>
        <ul>
          {list.map((el, idx) => (
            <li
              key={idx}
              className="list_detail"
              onClick={() => {
                history.push(`/view/${el.id}`);
              }}
            >
              <ul className="in_grid">
                <li className="img">
                  <img src={el.image}></img>
                </li>
                <li className="inf">
                  <ul>
                    <li className="title">
                      [
                      {el.tradeType === 'jointPurchase' ||
                      el.tradeType === '공구'
                        ? '공구'
                        : '나눔'}
                      ] {el.title}
                    </li>
                    <li className="location">{el.market}</li>
                    <li className="date">
                      {el.date} &#124; {el.time}
                    </li>
                    <li className="pepole">
                      지금 {el.currentMate}명 &#124; 전체 {el.totalMate}명
                    </li>
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
