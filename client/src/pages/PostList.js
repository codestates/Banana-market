import React, { useState, useEffect, useRef } from 'react';
import List from '../component/List';
import axios from 'axios';
import styled from 'styled-components';
// import ReactLoading from 'react-loading';
import { useSelector, useDispatch } from 'react-redux';
import { showPostList } from '../redux/actions/actions';
// import { useInView } from "react-intersection-observer";

const LoadingDiv = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin: 90px auto 60px auto;
`;

const PostList = () => {
  // const showPost = async () => {
  //   await axios
  //     .get('http://localhost:3001/articles/lists')
  //     .then((chatData) => {
  //       console.log(chatData);
  //       dispatch(showPostList(chatData.data.data.articleList));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   showPost();
  // }, []);
  // console.log(state);

  // const [list, setList] = useState([]);

  // const [target, setTarget] = useState("");
  // const [isLoding, setIsLoding] = useState(false);
  // const [pageNumber, setPageNumber] = useState(1);

  // const postList = async (pageNumber) => {
  //   // pageNumber = list.length / 8;
  //   await axios
  //     .get("http://localhost:3001/articles/lists")
  //     // {
  //     //   params: {
  //     //     page: pageNumber,
  //     //   },
  //     // }
  //     .then((chatData) => {
  //       // console.log(chatData);
  //       setIsLoding(true);
  //       setTimeout(() => {
  //         setList((list) => [
  //           ...list,
  //           ...chatData.data.data.articleList.slice(0, 8),
  //         ]);
  //         console.log(list);
  //         setIsLoding(false);
  //       }, 500);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // useEffect(() => {
  //   postList(pageNumber);
  // }, [pageNumber]);

  // const loadMore = () => {
  //   setPageNumber((prevPageNumber) => prevPageNumber + 1);
  // };

  // const pageEnd = useRef();
  // let num = 1;

  // useEffect(() => {
  //   if (isLoding) {
  //     const observer = new IntersectionObserver(
  //       (entries) => {
  //         if (entries[0].isIntersecting) {
  //           num++;
  //           loadMore();
  //           if (num >= 2) {
  //             observer.unobserve(pageEnd.current);
  //           }
  //         }
  //       },
  //       { threshold: 1 }
  //     );

  //     observer.observe(pageEnd.current);
  //   }
  // }, [isLoding, num]);

  // const chatList = async ([entry], observer) => {
  //   if (entry.isIntersecting && !isLoding && list.length >= 8) {
  //     observer.unobserve(entry.target);
  //     setIsLoding(true);
  //     await axios
  //       .get("http://localhost:3001/articles/lists")
  //       .then((chatData) => {
  //         // setList([...list, ...chatData.data.data.articleList]);
  //         setTimeout(() => {
  //           setIsLoding(false);
  //           // setList((list) =>
  //           //   list.concat(chatData.data.data.articleList.slice(0, 8))
  //           // );
  //           setList([...list, ...chatData.data.data.articleList.slice(0, 8)]);
  //         }, 1000);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     observer.observer(entry.target);
  //   }
  // };

  // useEffect(() => {
  //   let observer;
  //   if (target) {
  //     observer = new IntersectionObserver(chatList, {
  //       threshold: 0,
  //     });
  //     observer.observe(target);
  //   }
  //   return () => observer && observer.disconnect();
  // }, [target]);

  return (
    <div className="section">
      <List></List>
      {/* <div ref={pageEnd}></div>
      {isLoding === true ? <Loading></Loading> : null} */}
    </div>
  );
};

function Loading() {
  return (
    <LoadingDiv>{/* <ReactLoading type="spin" color="#ddd" /> */}</LoadingDiv>
  );
}

export default PostList;
