import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div`
  //( 기본적용 )모바일 : 768px 이하 ::  @media only제외한 모든 사이즈 적용

  background-color: yellow;
  max-width: 1200px;
  margin: 100px auto;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: auto auto;
  @media only screen and (max-width: 1200px) {
    width: 95%;
  }
  // PC : 1200px 이상 :: 1200px 이상 적용되는 css
  @media only screen and (max-width: 768px) {
    grid-template-columns: auto;
  }
`;

const Test1 = styled.div`
  min-height: 500px;
  float: left;
  border: solid 1px red;
  background-color: whitesmoke;
  // PC : 1200px 이상 :: 1200px 이상 적용되는 css
  @media only screen and (max-width: 768px) {
    display: ${(props) => props.color};
  }
`;

const Test2 = styled.div`
  min-height: 500px;
  border: solid 1px red;
  background-color: wheat;

  // PC : 1200px 이상 :: 1200px 이상 적용되는 css
  @media only screen and (max-width: 768px) {
    /* display: ${(props) => (props ? null : "none")}; */
    display: ${(props) => props.color2};
  }
`;

const Button = styled.button`
  background-color: #fff;
  width: 40px;
  height: 40px;
  display: none;
  @media only screen and (max-width: 768px) {
    display: block;
  }
`;

const List = styled.div`
  width: 100%;
  height: 80px;
  background-color: antiquewhite;
  cursor: pointer;
`;
const TestComponent = () => {
  const history = useHistory();
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 768px)",
  });
  const [color, setColor] = useState("none");
  const [color2, setColor2] = useState("block");

  const onClick = () => {
    color === "none" ? setColor("block") : setColor("null");
    color2 === "block" ? setColor2("none") : setColor2("null");
  };
  const onClick2 = () => {
    color === "block" ? setColor("none") : setColor("null");
    color2 === "none" ? setColor2("block") : setColor2("null");
  };
  // const onClick2 = () => {
  //   color === "block" ? setColor("none") : setColor("block");
  // };
  return (
    <>
      <div className="section2">
        <Wrapper>
          <Test1 color={color}>
            <List onClick={onClick2}></List>
          </Test1>
          <Test2 color2={color2}>
            <Button onClick={onClick}></Button>
          </Test2>
        </Wrapper>
        {/* {isSmallScreen ? (
          <div className="test2">
            <div className="btn" onClick={onClick}></div>
          </div>
        ) : null} */}
      </div>
    </>
  );
};

export default TestComponent;
