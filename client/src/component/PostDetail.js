import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useHistory, useParams } from 'react-router-dom';
import { postListDelete } from '../redux/actions/actions';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const DetailDiv = styled.div`
  max-width: 1200px;
  height: 745px;
  /* background-color: powderblue; */
  margin: 70px auto 70px auto;
  @media screen and (max-width: 1200px) {
    margin: 70px auto 60px auto;
  }
  @media screen and (max-width: 767px) {
    margin: 80px auto 30px auto;
    width: 100%;
  }
  .detail {
    width: 440px;
    height: 660px;
    border: 1px solid #c4c4c4;
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
    text-align: center;
    line-height: 45px;
    @media screen and (max-width: 767px) {
      margin: 30px auto 0 auto;
      width: 90%;
      height: 40px;
      line-height: 40px;
    }
  }

  .user_btn {
    width: 440px;
    height: 45px;
    box-sizing: border-box;
    margin: 40px auto 0 auto;
    border-radius: 50px;
    cursor: pointer;
    text-align: center;
    line-height: 45px;
    @media screen and (max-width: 767px) {
      margin: 30px auto 0 auto;
      width: 90%;
      height: 40px;
      line-height: 40px;
    }
    div {
      float: left;
    }
    .edit_btn {
      width: 200px;
      height: 45px;
      background-color: #95c710;
      box-sizing: border-box;
      border-radius: 50px;
      cursor: pointer;
      text-align: center;
      line-height: 45px;
      @media screen and (max-width: 767px) {
        width: 45%;
        height: 40px;
        line-height: 40px;
      }
    }
    .delete_btn {
      width: 200px;
      height: 45px;
      float: right;
      background-color: rgba(0, 0, 0, 0.15);
      box-sizing: border-box;
      border-radius: 50px;
      color: white;
      cursor: pointer;
      text-align: center;
      line-height: 45px;
      @media screen and (max-width: 767px) {
        width: 45%;
        height: 40px;
        line-height: 40px;
      }
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
    border-bottom: 1px solid #ddd;

    box-sizing: border-box;
    margin-bottom: 20px;
    @media screen and (max-width: 767px) {
      width: 90%;
      height: 85px;
      margin: 20px auto 20px auto;
    }
    > .in_grid {
      display: grid;
      grid-template-columns: 70px auto;
      grid-gap: 25px;
      @media screen and (max-width: 1200px) {
        grid-template-columns: 70px auto;
      }

      @media screen and (max-width: 768px) {
        grid-template-columns: 65px auto;
        grid-gap: 20px;
      }
      .image {
        min-height: 70px;
        background-color: #ddd;
        border-radius: 50px;
        @media screen and (max-width: 768px) {
          min-height: 65px;
        }

        img {
          width: 100%;
          height: 100%;
          border-radius: 50px;
        }
      }
      .profile_info {
        min-height: 70px;
        @media screen and (max-width: 768px) {
          min-height: 65px;
        }
        .id {
          font-weight: 500;
          margin-top: 5px;
          @media screen and (max-width: 768px) {
            font-size: 15px;
            margin-top: 4px;
          }
        }
        .location {
          font-size: 12px;
          margin-top: 5px;
          color: #9d9c9c;
          @media screen and (max-width: 768px) {
            font-size: 11px;
            margin-top: 4px;
          }
        }
        .deal_total {
          font-size: 14px;
          margin-top: 2px;
          color: #2b2828;
          @media screen and (max-width: 768px) {
            font-size: 13px;
          }
        }
      }
    }
  }
  .title {
    width: 380px;
    height: 25px;
    /* background-color: salmon; */
    box-sizing: border-box;
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 21px;
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto 20px auto;
      font-size: 19px;
    }
  }

  .content {
    width: 380px;
    height: 120px;
    /* background-color: salmon; */
    box-sizing: border-box;
    margin-bottom: 20px;
    font-size: 17px;
    line-height: 1.5;
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto 20px auto;
      font-size: 15px;
      height: 110px;
    }
  }
  .date {
    width: 380px;
    height: 30px;
    /* background-color: salmon; */
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    margin-bottom: 20px;
    font-size: 15px;
    color: #2b2828;
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto 20px auto;
      font-size: 14px;
    }
  }
  .pepole {
    width: 380px;
    height: 30px;
    /* background-color: salmon; */
    border-bottom: 1px solid #ddd;
    box-sizing: border-box;
    font-size: 15px;
    margin-bottom: 20px;
    color: #2b2828;
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto 20px auto;
      font-size: 14px;
    }
  }
  .map {
    width: 380px;
    height: 205px;
    border: 1px solid #c4c4c4;
    border-radius: 8px;
    box-sizing: border-box;
    @media screen and (max-width: 767px) {
      width: 90%;
      margin: 0 auto;
      height: 255px;
    }
  }
`;

const PostDetail = ({ chatListDetail, handleClick }) => {
  const history = useHistory();
  // const [postid, setPostid] = useState(0);
  const postDetail = useSelector((state) => state.postDetailReducer);
  const dispatch = useDispatch();
  const { post, postWriter } = postDetail;
  const basicProfileImage = postWriter.profile_image || null;

  let articleNum = useParams();
  // console.log(articleid);

  const showPostDetail = (articleid) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/articles/${articleid}`)
      .then((detailData) => {
        dispatch({
          type: 'SHOW_POST',
          payload: detailData.data.data.post,
        });
        dispatch({
          type: 'SHOW_WRITER',
          payload: detailData.data.data.postWriter,
        });
        console.log(detailData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    showPostDetail(articleNum.id);
  }, []);

  const postDelete = (articleid) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/articles/${articleid}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        // dispatch(postListDelete());
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const handleClickDeleteImg = (e) => {
  //   axios
  //     .delete(`${process.env.REACT_APP_API_URL}/users/profile-image`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       dispatch({ type: 'SET_USER_INFO_PROFILE_IMG_NULL' });
  //       document.getElementById('image').value = '';
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <DetailDiv>
      <div className="detail">
        <UlDiv>
          <div className="profile">
            <ul className="in_grid">
              <li className="image">
                <img src={basicProfileImage}></img>
              </li>
              <li className="profile_info">
                <ul>
                  <li className="id">{postWriter.name}</li>
                  <li className="location">{postWriter.region}</li>
                  <li className="deal_total">
                    총 거래 : {postWriter.totalTrade}회
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <li className="title">
            [{post.tradeType}] {post.title}
          </li>
          <li className="content">{postDetail.content}</li>
          <li className="date">
            {post.date} &#124; {post.time}
          </li>
          <li className="pepole">
            지금 {post.currentMate} 명 &#124; 전체 {post.totalMate} 명
          </li>
          <li className="map"></li>
        </UlDiv>
      </div>
      {postWriter.isMyPost === true ? (
        <div className="user_btn">
          <div className="edit_btn">수정하기</div>
          <div
            className="delete_btn"
            onClick={() => {
              postDelete(post.id);
              history.push('/list');
            }}
          >
            삭제하기
          </div>
        </div>
      ) : (
        <div
          className="btn"
          onClick={() => {
            // handleClick();
            history.push('/chat');
          }}
        >
          참여하기
        </div>
      )}
    </DetailDiv>
  );
};

export default PostDetail;
