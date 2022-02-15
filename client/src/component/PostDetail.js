import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const DetailDiv = styled.div`
  max-width: 500px;
  height: 745px;
  /* background-color: powderblue; */
  margin: 50px auto;
  @media screen and (max-width: 767px) {
    margin: 80px auto 50px auto;
    height: 735px;
  }
  .detail {
    width: 440px;
    height: 660px;
    border: 1px solid #fff;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 10px;
    /* padding-top: 20px; */
  }

  .btn {
    width: 440px;
    height: 45px;
    border: 1px solid #fff;
    box-sizing: border-box;
    margin: 40px auto 0 auto;
    border-radius: 50px;
    cursor: pointer;
    @media screen and (max-width: 767px) {
      margin: 30px auto 0 auto;
    }
  }
`;

const UlDiv = styled.ul`
  width: 380px;
  height: 595px;
  /* background-color: rebeccapurple; */
  margin: 30px auto;
  border-radius: 10px;

  .profile {
    width: 380px;
    height: 73px;
    border: 1px solid #fff;
    border-radius: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .title {
    width: 380px;
    height: 130px;
    border: 1px solid #fff;
    border-radius: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .date {
    width: 380px;
    height: 46px;
    border: 1px solid #fff;
    border-radius: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .pepole {
    width: 380px;
    height: 46px;
    border: 1px solid #fff;
    border-radius: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  .map {
    width: 380px;
    height: 220px;
    border: 1px solid #fff;
    border-radius: 10px;
    box-sizing: border-box;
  }
`;

const PostDetail = () => {
  const history = useHistory();
  return (
    <DetailDiv>
      <div className="detail">
        <UlDiv>
          <li className="profile"></li>
          <li className="title"></li>
          <li className="date"></li>
          <li className="pepole"></li>
          <li className="map"></li>
        </UlDiv>
      </div>
      <div
        className="btn"
        onClick={() => {
          history.push("/chat");
        }}
      ></div>
    </DetailDiv>
  );
};

export default PostDetail;
