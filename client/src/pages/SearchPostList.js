import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import SearchList from '../component/SearchList';
import axios from 'axios';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import {
  showPostData,
  showMorePostList,
  categoryList,
  searchPostListReset,
} from '../redux/actions/actions';
// import { useInView } from "react-intersection-observer";

const PageEnd =  styled.div`
  /* background-color: red; */
  height: 10px;
`
const LoadingDiv = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 90px auto 90px auto;
`;

// ----------------------Loading 컴포넌트
function Loading() {
  return (
    <LoadingDiv>
      <Oval color="#00BFFF" height={30} width={30} />
    </LoadingDiv>
  );
}

// ------------------PostList 컴포넌트
const SearchPostList = () => {
  const [isLoding, setIsLoding] = useState(false); 
  const setSearchInfo = useSelector((state) => state.setSearchInfoReducer);
  const state = useSelector((state) => state.setSearchListReducer); //리스트 상태값
  const dispatch = useDispatch();
  let searchWord = useParams().id;

  // 페이지 별 리스트 요청 함수  ------ 3
  const postList = async (searchWord, pageNumber) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/articles/lists`, {
        params: {
          page: pageNumber,
          search: searchWord,
        },
      })
      .then((listData) => {
        let result = String(listData.data.message);
        if (result === 'No results found!'){
          dispatch({
            type: 'SET_RESULT_COUNT_NUM',
            payload: 0,
          });
          setIsLoding(false);
        } else if (result === 'No more articles') {
          setIsLoding(false);
        } else if (result.includes('About')) {
          if(pageNumber === 0) {
            dispatch({
              type: 'SET_RESULT_COUNT_NUM',
              payload: result.split(' ')[1],
            });
          }
          dispatch({
            type: 'SET_SEARCH_PAGE_NUM',
            payload: setSearchInfo.searchPageNum + 1
          })
          dispatch({
            type: 'SHOW_MORE_SEARCH_POSTLIST',
            payload: listData.data.data.articleList,
          });
          setIsLoding(true);
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
            dispatch({
              type: 'SET_SEARCH_PAGE_NUM',
              payload: setSearchInfo.searchPageNum + 1
            })
            // 페이지 넘버를 바꿔준다.
          }
        },
        { threshold: 0 }
      );
      observer.observe(pageEnd.current);
    }
  }, [isLoding]);

  // useEffect :: < 처음 로딩 될때 || 검색단어 바뀔때 || 페이지 숫자 바뀔때 > 만 실행되는 리스트 요청 함수 ------ 1
  useEffect(() => {
    console.log('업데이트')
    postList(searchWord, setSearchInfo.searchPageNum);
  }, [searchWord, setSearchInfo.searchPageNum]);

  // 새로고침시 재검색 되게 함
  useEffect(() => {
    console.log('새로고침')
    dispatch({
      type: 'SET_WORD_FOR_SEARCH',
      payload: searchWord,
    });
  }, [])

  // setSearchInfo.searchPageNum
  return (
    <div className="section">
      <SearchList></SearchList>
      <PageEnd ref={pageEnd}></PageEnd>
      {isLoding ? <Loading></Loading> : '더 이상 불러올 게시글이 없습니다.'}
    </div>
  );
};

export default SearchPostList;
