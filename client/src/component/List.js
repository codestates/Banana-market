import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const SelectBtn = styled.div`
  max-width: 1200px;
  height: 35px;
  margin: 60px auto 55px auto;

  @media screen and (max-width: 1200px) {
    margin: 50px 15px 15px 15px;
  }

  @media screen and (max-width: 767px) {
    margin: 70px 15px 10px 15px;
  }

  .location {
    width: 150px;
    height: 35px;
    border: 1px solid #fff;
    border-radius: 10px;
    float: left;

    @media screen and (max-width: 767px) {
      width: 130px;
    }
  }

  .selectBox {
    float: right;
    div {
      float: left;
    }
    .category {
      width: 120px;
      height: 35px;
      border: 1px solid #fff;
      border-radius: 10px;
      margin-right: 20px;

      @media screen and (max-width: 767px) {
        width: 100px;
      }

      /* > select {
          width: 115px;
          height: 35px;
          border-radius: 8px;
          outline: 0 none;
          > option {
            background: black;
            color: #fff;
          }
        } */
    }
    .sort {
      width: 100px;
      height: 35px;
      border: 1px solid #fff;
      border-radius: 10px;

      @media screen and (max-width: 767px) {
        width: 80px;
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
      margin: 0px auto;
    }

    > .list_detail {
      /* box-shadow: 2px 3px 4px 2px #ddd; */
      /* min-width: 379px; */
      min-height: 140px;
      border: 1px solid #fff;
      border-radius: 10px;
      cursor: pointer;
      /* margin-bottom: 25px; */
      transition: all 0.2s linear;
      &:hover {
        opacity: 0.8;
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
        > li {
          min-height: 120px;
          border: 1px solid #fff;
          border-radius: 10px;
          cursor: pointer;
          @media screen and (max-width: 1200px) {
            /* min-width: 300px; */
            min-height: 115px;
          }

          @media screen and (max-width: 768px) {
            min-height: 110px;
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
        <div className="location"></div>
        <div className="selectBox">
          <div className="category"></div>
          <div className="sort"></div>
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
                <li className="inf"></li>
              </ul>
            </li>
          ))}
        </ul>
      </ListDiv>
    </>
  );
};

export default List;

{
  /* <select>
              <option value='전체'>전체</option>
              <option value="정육/계란">정육/계란</option>
              <option value="과일">과일</option>
              <option value="우유/유제품">우유/유제품</option>
              <option value="채소">채소</option>
              <option value="수산/건어물">수산/건어물</option>
              <option value="베이커리">베이커리</option>
              <option value="간식/떡/빙과">간식/떡/빙과</option>
              <option value="김치/반찬">김치/반찬</option>
              <option value="기타">기타</option>
            </select> */
}
