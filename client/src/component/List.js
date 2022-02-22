import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const SelectBtn = styled.div`
  max-width: 1200px;
  height: 35px;
  margin: 60px auto 55px auto;
  /* background-color: sienna; */
  @media screen and (max-width: 1200px) {
    margin: 50px 15px 15px 15px;
  }

  @media screen and (max-width: 767px) {
    margin: 75px 10px 10px 10px;
    height: 30px;
  }

  .location {
    min-width: 140px;
    height: 35px;
    margin-left: 5px;
    border-radius: 10px;
    float: left;

    @media screen and (max-width: 1200px) {
      margin-left: 0;
    }
    @media screen and (max-width: 767px) {
      min-width: 120px;
      height: 30px;
    }
    .grid {
      display: grid;
      grid-template-columns: 30px auto;
      grid-gap: 15px;

      @media screen and (max-width: 768px) {
        grid-template-columns: 28px auto;
      }

      .location_img {
        min-height: 35px;
        background-color: #ddd;
        @media screen and (max-width: 767px) {
          min-height: 30px;
        }
      }
      .location_info {
        line-height: 35px;
        @media screen and (max-width: 767px) {
          line-height: 30px;
          font-size: 15px;
        }
      }
    }
  }

  .selectBox {
    float: right;
    .category {
      width: 120px;
      height: 35px;
      border-radius: 5px;
      margin-right: 20px;

      @media screen and (max-width: 767px) {
        width: 100px;
        height: 30px;
      }
    }
    .sort {
      width: 100px;
      height: 35px;
      border-radius: 5px;
      margin-right: 5px;
      @media screen and (max-width: 1200px) {
        margin-right: 0;
      }
      @media screen and (max-width: 767px) {
        width: 80px;
        height: 30px;
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
  return (
    <>
      <SelectBtn>
        <div className="location">
          <ul className="grid">
            <li className="location_img"></li>
            <li className="location_info">일산동구</li>
          </ul>
        </div>
        <div className="selectBox">
          <select className="category">
            <option value="전체">전체</option>
            <option value="정육/계란">정육/계란</option>
            <option value="과일">과일</option>
            <option value="우유/유제품">우유/유제품</option>
            <option value="채소">채소</option>
            <option value="수산/건어물">수산/건어물</option>
            <option value="베이커리">베이커리</option>
            <option value="간식/떡/빙과">간식/떡/빙과</option>
            <option value="김치/반찬">김치/반찬</option>
            <option value="기타">기타</option>
          </select>
          <select className="sort">
            <option value="최신순">최신순</option>
            <option value="기한순/계란">기한순</option>
          </select>
        </div>
      </SelectBtn>
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
    </>
  );
};

export default List;

