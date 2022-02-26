import React, { useState, useEffect, useRef, useCallback } from 'react';
import List from '../component/List';
import axios from 'axios';
import styled from 'styled-components';
import { Oval } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import {
  showPostData,
  showMorePostList,
  categoryList,
  postListReset,
} from '../redux/actions/actions';
// import { useInView } from "react-intersection-observer";

const LoadingDiv = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 90px auto 90px auto;
`;

const PostList = () => {
  const [isLoding, setIsLoding] = useState(false);
  const state = useSelector((state) => state.postListReducer);
  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(state.length / 10);
  const [categoryData, setCategoryData] = useState('');
  const [list, setList] = useState([]);

  // const onSelect = useCallback((category) => setCategoryData(category), []);

  const handleFilterCategory = (event) => {
    if (event.target.value === '전체') {
      dispatch(postListReset());
      setCategoryData('');
      setPageNumber(0);
      postList('', 0);
    } else {
      dispatch(postListReset());
      setCategoryData(event.target.value);
      console.log(categoryData);
      console.log(event.target.value);
      setPageNumber(0);
      postList(event.target.value, 0);
    }
  };

  const postList = async (categoryData, pageNumber) => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/articles/lists`, {
        params: {
          category: categoryData,
          page: pageNumber,
          // search: search,
          // sort: sort,
          // isHost: isHost,
        },
      })
      .then((listData) => {
        console.log(listData);

        if (listData.data.data.articleList.length === 0) {
          // setTimeout(() => {
          //   setIsLoding(false);
          // }, 500);
          setIsLoding(false);
        } else {
          setIsLoding(true);
          dispatch({
            type: 'SHOW_MORE_POSTLIST',
            payload: listData.data.data.articleList,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    postList(categoryData, pageNumber);
  }, [pageNumber]);

  const loadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const pageEnd = useRef();

  useEffect(() => {
    if (isLoding) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 0 }
      );
      observer.observe(pageEnd.current);
    }
  }, [isLoding]);

  return (
    <div className="section">
      <List
        categoryData={categoryData}
        // onSelect={onSelect}
        handleFilterCategory={handleFilterCategory}
        // list={list}
        // setList={setList}
      ></List>
      <div ref={pageEnd}></div>
      {isLoding ? <Loading></Loading> : '더 이상 불러올 게시글이 없습니다.'}
    </div>
  );
};
function Loading() {
  return (
    <LoadingDiv>
      <Oval color="#00BFFF" height={30} width={30} />
    </LoadingDiv>
  );
}

export default PostList;
