import React, { useState, useEffect, useRef } from 'react';
import List from '../component/List';
import axios from 'axios';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import MyPostList from '../component/MyPostList';
import { myPostListReset } from '../redux/actions/actions';

const LoadingDiv = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 90px auto 90px auto;
`;

const AlertDiv = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 75px auto;
`;

// ----------------------Loading 컴포넌트
function Loading() {
  return (
    <LoadingDiv>
      <Oval color="#00BFFF" height={30} width={30} />
    </LoadingDiv>
  );
}

function EndAlert() {
  return (
    <>
      <AlertDiv>더 이상 불러올 게시글이 없습니다.</AlertDiv>
    </>
  );
}

const MyList = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [isHost, setIsHost] = useState('true, false');
  let [isChecked, setIsChecked] = useState(false);
  const state = useSelector((state) => state.myPostListReducer); //리스트 상태값
  const [pageNumber, setPageNumber] = useState(state.length / 10);
  const dispatch = useDispatch();

  // 페이지 별 리스트 요청 함수  ------ 3
  const postList = async (pageNumber, isHost) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/articles/lists`, {
        params: {
          page: pageNumber,
          // search: search,
          isHost: isHost,
        },
      })
      .then((listData) => {
        if (listData.data.data.articleList.length === 0) {
          // setTimeout(() => {
          //   setIsLoding(false);
          // }, 500);
          setIsLoding(false);
        } else {
          let { articleList } = listData.data.data;
          articleList = articleList.map(async (elem) => {
            let postImageKey = elem.image;
            elem.image = `https://d2fg2pprparkkb.cloudfront.net/${postImageKey}?w=115&h=115&f=webp&q=90`;
            return elem;
          });

          setTimeout(() => {
            setIsLoding(true);
            dispatch({
              type: 'MY_POST_LIST',
              payload: listData.data.data.articleList,
            });
          }, 400);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 로딩을 만나면 페이지 넘버를 바꿔준다. ------ 2 -> 1
  const pageEnd = useRef();
  useEffect(() => {
    if (isLoding) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1); // 페이지 넘버를 바꿔준다.
          }
        },
        { threshold: 0 }
      );
      observer.observe(pageEnd.current);
    }
  }, [isLoding]);

  // useEffect :: < 처음 로딩 될때 || 카테고리 데이터 바뀔때 || 페이지 숫자 바뀔때 > 만 실행되는 리스트 요청 함수 ------ 1
  useEffect(() => {
    postList(pageNumber, isHost);
  }, [pageNumber, isHost]);

  // Input 값 받는 함수
  const handleChangeCheckBox = (e) => {
    if (isChecked === false) {
      setIsChecked(true);
      dispatch(myPostListReset());
      setIsHost('true');
      setPageNumber(0);
    } else {
      setIsChecked(false);
      dispatch(myPostListReset());
      setIsHost('true, false');
      setPageNumber(0);
    }
  };

  return (
    <div className="section">
      <MyPostList handleChangeCheckBox={handleChangeCheckBox}></MyPostList>
      <div ref={pageEnd}></div>
      {isLoding ? <Loading></Loading> : null}
    </div>
  );
};

export default MyList;
