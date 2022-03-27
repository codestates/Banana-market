import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
// import ReactLoading from "react-loading";
import axios from 'axios';

// const Wrapper = styled.div`
//   //( 기본적용 )모바일 : 768px 이하 ::  @media only제외한 모든 사이즈 적용

//   background-color: yellow;
//   max-width: 1200px;
//   margin: 100px auto;
//   display: grid;
//   grid-gap: 15px;
//   grid-template-columns: auto auto;
//   @media only screen and (max-width: 1200px) {
//     width: 95%;
//   }
//   // PC : 1200px 이상 :: 1200px 이상 적용되는 css
//   @media only screen and (max-width: 768px) {
//     grid-template-columns: auto;
//   }
// `;

// const Test1 = styled.div`
//   min-height: 500px;
//   float: left;
//   border: solid 1px red;
//   background-color: whitesmoke;
//   // PC : 1200px 이상 :: 1200px 이상 적용되는 css
//   @media only screen and (max-width: 768px) {
//     display: ${(props) => props.color};
//   }
// `;

// const Test2 = styled.div`
//   min-height: 500px;
//   border: solid 1px red;
//   background-color: wheat;

//   // PC : 1200px 이상 :: 1200px 이상 적용되는 css
//   @media only screen and (max-width: 768px) {
//     /* display: ${(props) => (props ? null : "none")}; */
//     display: ${(props) => props.color2};
//   }
// `;

// const Button = styled.button`
//   background-color: #fff;
//   width: 40px;
//   height: 40px;
//   display: none;
//   @media only screen and (max-width: 768px) {
//     display: block;
//   }
// `;

// const List = styled.div`
//   width: 100%;
//   height: 80px;
//   background-color: antiquewhite;
//   cursor: pointer;
// `;
// const LoaderWrap = styled.div`
//   width: 30px;
//   height: 30px;
//   display: flex;
//   justify-content: center;
//   text-align: center;
//   align-items: center;
//   margin: 60px auto;
// `;

// const ItemWrap = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;

//   flex-direction: column;
//   justify-content: center;
//   text-align: center;
//   align-items: center;

//   .Item {
//     width: 350px;
//     height: 100px;
//     display: flex;
//     flex-direction: column;
//     background-color: #ffffff;
//     margin: 1rem;
//     box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
//     border-radius: 6px;
//   }
// `;

const TestComponent = () => {
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchPhotos = async (pageNumber) => {
    const Access_Key = 'VaS3ud1C-0gdW1nw41FbBryaV_Q5obZ04o-3Vi2QC1E';
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${pageNumber}&per_page=5`
    );
    const data = await res.json();
    setTimeout(() => {
      setPhotos((p) => [...p, ...data]);
      setLoading(true);
      //           setIsLoding(false);
      //           // setList((list) =>
      //           //   list.concat(chatData.data.data.articleList.slice(0, 8))
      //           // );
      //           setList([...list, ...chatData.data.data.articleList.slice(0, 8)]);
    }, 1000);
    // console.log(data)
  };

  useEffect(() => {
    fetchPhotos(pageNumber);
  }, [pageNumber]);

  const loadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const pageEnd = useRef();
  let num = 1;

  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            num++;
            loadMore();
            if (num >= 5) {
              observer.unobserve(pageEnd.current);
            }
          }
        },
        { threshold: 1 }
      );

      observer.observe(pageEnd.current);
    }
  }, [loading, num]);

  // const history = useHistory();
  // const isSmallScreen = useMediaQuery({
  //   query: "(max-width: 768px)",
  // });
  // const [color, setColor] = useState("none");
  // const [color2, setColor2] = useState("block");

  // const onClick = () => {
  //   color === "none" ? setColor("block") : setColor("null");
  //   color2 === "block" ? setColor2("none") : setColor2("null");
  // };
  // const onClick2 = () => {
  //   color === "block" ? setColor("none") : setColor("null");
  //   color2 === "none" ? setColor2("block") : setColor2("null");
  // };
  // const onClick2 = () => {
  //   color === "block" ? setColor("none") : setColor("block");
  // };
  // const [itemList, setItemList] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // ItemList
  // const [target, setTarget] = useState(""); // target
  // const [isLoding, setIsLoding] = useState(false); // isloding

  // const onIntersect = async ([entry], observer) => {
  //   if (entry.isIntersecting && !isLoding) {
  //     observer.unobserve(entry.target);
  //     setIsLoding(true);
  //     // 데이터를 가져오는 부분
  //     await new Promise((resolve) => setTimeout(resolve, 100));
  //     let Items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  //     setItemList((itemLists) => itemLists.concat(Items));
  //     setIsLoding(false);
  //     observer.observe(entry.target);
  //   }
  // };

  // useEffect(() => {
  //   let observer;
  //   if (target) {
  //     // callback 함수, option
  //     observer = new IntersectionObserver(onIntersect, {
  //       threshold: 0.4,
  //     });
  //     observer.observe(target); // 타겟 엘리먼트 지정
  //   }
  //   return () => observer && observer.disconnect();
  // }, [target]);
  return (
    <>
      {/* <div className="App">
        <ItemWrap>
          {itemList.map((item, index) => (
            <div className="Item" key={index}>
              {index + 1}
            </div>
          ))}
        </ItemWrap>
        {isLoding ? (
          <LoaderWrap>
            <ReactLoading type="spin" color="#A593E0" />
          </LoaderWrap>
        ) : (
          ""
        )}
        <div ref={setTarget}></div>
      </div> */}
      <h1>Infinite scrolling react hooks</h1>
      {photos.map((photo, index) => (
        <div className="photos" key={index}>
          <img src={photo.urls.small} alt="" />
        </div>
      ))}
      <div ref={pageEnd}></div>

      <h3>{photos.length}</h3>

      {/* <button onClick={loadMore} ref={pageEnd}>
        Load More
      </button> */}
    </>
  );
};

export default TestComponent;
