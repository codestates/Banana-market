import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import '../App.css'; //이거 써줘야 css적용됨.

const BREAK_POINT_TABLET = 768;
const BREAK_POINT_PC = 1200;

const Wrapper = styled.div`
  //( 기본적용 )모바일 : 768px 이하 ::  @media only제외한 모든 사이즈 적용
  width: 100%;
  height: 100vh;
  padding: 0 30px;
  background-color: yellow;
  margin : auto;
  .test {
    width: 50%;
    height: 50%;
    border: solid 1px black;
    float: left;
  }
  // 태블릿 : 1200px ~ 768px :: 768px 이상 적용되는 css
  @media only screen and (min-width: ${BREAK_POINT_TABLET}px){
    /* width: 100%;
    padding: 0 30px; */
    background-color: orange;
    .test {
      width: 25%;
      height: 50vh;
      border: solid 1px black;
      float: left;
    }
  }
  // PC : 1200px 이상 :: 1200px 이상 적용되는 css
  @media only screen and (min-width: ${BREAK_POINT_PC}px){
    width: 1200px;
    padding: 0;
    background-color: red;
    /* .test {
      width: 25%;
      height: 100%;
      border: solid 1px black;
      float: left;
    } */
  }
`;
const TestComponent = () => {
  return (
    <div className='section'>
      <Wrapper>
        <div className='test'></div>
        <div className='test'></div>
        <div className='test'></div>
        <div className='test'></div>
      </Wrapper>
    </div>
  );
};

export default TestComponent;