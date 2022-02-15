import React, { useState } from "react";
import styled from "styled-components";
import '../App.css'; //이거 써줘야 css적용됨.

import login from "../icon/login.png";

const BREAK_POINT_TABLET = 768;
const BREAK_POINT_PC = 1200;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin : auto;

  .search_box{
    width: 100%;
    height: 200px;
    padding: 10px 22px 0 22px;
    background-color: gray;
    .search {
      width: 100%;
      height: 36px;
      margin : auto;
      border-radius: 100px;
      background-color: #f8f9fa;
      border: solid 2px #90bd19; 
      padding: 8px 15px;
      .icon{
        width: 20px;
        float: left;
      }
      >span{
        padding-left: 15px;
        float: left;
        line-height: 20px;
        color: rgba(0,0,0,0.5);
      }
      .icon_wrapper{
        float: right;
        border: 1px solid red;
        .search_icon{
          margin-left:30px;
        }
      }
    }
    .word_box {
      margin-top: 10px;
      width : 100%;
      border: 1px solid red;
      .word {
        margin-top: 10px;
        margin-right: 10px;
        padding: 0 10px;
        height: 22px;
        background-color: yellow;
        float: left;
      }
    }
  }
  .input{
    width: calc(100vw - 220px);
  }
  
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px){
    .search_box{
      width: calc(100vw - 333px);
      float: left;
      padding: 10px 40px 0 40px;
    }     
    .input {
      width: calc(100vw - 580px);
    } 
  }

  @media only screen and (min-width: ${BREAK_POINT_PC}px){
    width: 1200px;
    padding: 0;
    /* background-color: purple; */
    .search_box{
      width:833px;
      text-align: center;
      padding: 12px 40px 0 40px;
      .search {
        width: 100%;
        height: 40px;
        margin: auto;
        border-radius: 100px;
      }
    }
    .input {
      width: 600px;
    }
  }
`;

const SearchModal = ({ setSearchBox }) => {
  return (
    <Wrapper>
      <div className='search_box'>
        <div className='search'>
          <img src={login} className="icon exit_icon" onClick={() => {setSearchBox(false);}} />
          <span>
            <input className='input' type='text'/>
          </span>
          <div className='icon_wrapper'>
            <img src={login} className="icon delete_icon" />
            <img src={login} className="icon search_icon" />
          </div>
        </div>
        <div className='word_box'>
          <div>추천 검색어</div>
          <div>
            <div className='word'>사과</div>
            <div className='word'>오징어</div>
            <div className='word'>배</div>
            <div className='word'>김치</div>
            <div className='word'>수박</div>
            <div className='word'>딸기</div>
            <div className='word'>고등어</div>
            <div className='word'>베이글</div>
            <div className='word'>우유</div>
            <div className='word'>요구르트</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default SearchModal;