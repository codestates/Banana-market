import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import '../App.css'; //이거 써줘야 css적용됨.

const BREAK_POINT_TABLET = 768;
const BREAK_POINT_PC = 1200;

const Wrapper = styled.div`
  //( 기본적용 )모바일 : 768px 이하 ::  @media only제외한 모든 사이즈 적용
  width: 100%;
  height: 100%;
  padding: 0 22px;
  border: 2px solid black;
  margin : auto;
  > div {
    width: 100%;
    height: 80vh;
  }
  .page1 {
    padding-top: 50px; // 검색영역 보이는 페이지만 넣는 것
    background-color: red;
  }
  .page2 {
    background-color: orange;
  }
  .page3 {
    background-color: yellow;
  }
  .page4 {
    background-color: green;
    padding-top: 100px;
  }
  .btn-home {
    height: 40px;
    background-color: limegreen;
    margin : auto;
    text-align: center;
    line-height: 40px;
  }
  // 태블릿 : 1200px ~ 768px :: 768px 이상 적용되는 css
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px){
    .page1 {
      padding-top: 0px; // 검색영역 보이는 페이지만 넣는 것
    }
  }
  // PC : 1200px 이상 :: 1200px 이상 적용되는 css
  @media only screen and (min-width: ${BREAK_POINT_PC}px){
    width: 1200px;
    padding: 0;
    background-color: red;
  }
`;
const Render = () => {
  return (
      <Wrapper>
        <div className='page1'>페이지1</div>
        <div className='page2'>페이지2</div>
        <div className='page3'>페이지3</div>
        <div className='page4'>페이지2
        <Link to='/list'><div className='btn-home'>바나나마켓 바로가기</div></Link>
        </div>
      </Wrapper>
  );
};

export default Render;