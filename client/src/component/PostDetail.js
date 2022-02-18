import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const DetailDiv = styled.div`
  max-width: 1200px;
  height: 745px;
  /* background-color: powderblue; */
  margin: 50px auto;
  @media screen and (max-width: 767px) {
    margin: 80px auto 30px auto;
    width: 100%;
  }
  .detail {
    width: 440px;
    height: 660px;
    border: 1px solid #000;
    box-sizing: border-box;
    margin: 0 auto;
    /* background-color: peachpuff; */
    border-radius: 10px;
    @media screen and (max-width: 767px) {
      width: 90%;
      height: 675px;
    }
    /* padding-top: 20px; */
  }

  .btn {
    width: 440px;
    height: 45px;
    border: 1px solid #000;
    box-sizing: border-box;
    margin: 40px auto 0 auto;
    border-radius: 50px;
    cursor: pointer;
    @media screen and (max-width: 767px) {
      margin: 25px auto 0 auto;
      width: 90%;
    }
  }
`;

const UlDiv = styled.ul`
  width: 380px;
  height: 595px;
  /* background-color: rebeccapurple; */
  margin: 30px auto;
  border-radius: 10px;
  @media screen and (max-width: 767px) {
    width: 100%;
    margin: 0;
  }
  .profile {
    width: 380px;
    height: 90px;
    background-color: salmon;
    border-bottom: 1px solid #ddd;

    box-sizing: border-box;
    margin-bottom: 20px;
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 20px auto 20px auto;
    }
    div {
      float: left;
    }
    .image {
      width: 70px;
      height: 70px;
      border-radius: 50px;
      background-color: sandybrown;
    }
    .profile_info {
      width: 280px;
      height: 50px;
      background-color: seagreen;
      margin-top: 10px;
      margin-left: 25px;
    }
  }
  .title {
    width: 380px;
    height: 130px;
    background-color: salmon;
    box-sizing: border-box;
    margin-bottom: 20px;
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto 20px auto;
    }
  }
  .date {
    width: 380px;
    height: 40px;
    background-color: salmon;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    margin-bottom: 20px;
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto 20px auto;
    }
  }
  .pepole {
    width: 380px;
    height: 40px;
    background-color: salmon;
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    margin-bottom: 20px;
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto 20px auto;
    }
  }
  .map {
    width: 380px;
    height: 220px;
    border: 1px solid #000;
    border-radius: 8px;
    box-sizing: border-box;
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto;
      height: 255px;
    }
  }
`;

const PostDetail = () => {
  const history = useHistory();
  return (
    <DetailDiv>
      <div className="detail">
        <UlDiv>
          <li className="profile">
            <div className="image">
              <img></img>
            </div>
            <div className="profile_info"></div>
          </li>
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
      >
        <p
          style={{
            textAlign: "center",
          }}
        >
          참여하기
        </p>
      </div>
    </DetailDiv>
  );
};

export default PostDetail;