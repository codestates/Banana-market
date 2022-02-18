import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import github_icon from "../icon/github_icon.png";
import axios from "axios";
import marketList from '../resource/marketList'

const { kakao } = window;

axios.defaults.withCredentials = true;

const MapModalWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;

  > .map_modal {
    max-width: 768px;
    height: 650px;
    background-color: white;
    position: relative;
    top: 15%;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 8px;
    /* background: #fff; */
    border: 1px solid #8b8585;
    > .close {
      width: 28px;
      height: 28px;
      color: #8b8585;
      float: right;
      font-size: 30px;
      cursor: pointer;
    }
    #map {
      width: 95%;
      height: 70%;
      margin: 50px auto 0 auto;
      import React, { useState, useEffect} from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import github_icon from "../icon/github_icon.png";
import axios from "axios";
import guCodeList from '../resource/guCodeList'

const { kakao } = window;

axios.defaults.withCredentials = true;

const MapModalWrapper = styled.div`
  position: absolute;
  top: -100px;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;

  > .map_modal {
    max-width: 1200px;
    height: 100vh;
    background-color: white;
    position: relative;
    top: 15%;
    box-sizing: border-box;
    margin: 0 auto;
    border-radius: 8px;
    /* background: #fff; */
    border: 1px solid #8b8585;
    > .close {
      width: 28px;
      height: 28px;
      color: #8b8585;
      float: right;
      font-size: 30px;
      cursor: pointer;
    }
    #map {
      width: 95%;
      height: 70%;
      margin: 50px auto 0 auto;
      background-color: purple;

    }
    #result {
      width: 95%;
      height: 50px;
      margin: 50px auto 0 auto;
      /* background-color: purple; */

    }
    > .search_box {
      width: 260px;
      height: 375px;
      box-sizing: border-box;
      margin: 65px auto 0 auto;

      > .input {
        width: 252px;
        height: 35px;
        margin: 10px auto;
        outline: none;
        border: 1px solid rgb(0, 0, 0, 0.3);
        outline: 0;
      }
      > .search_btn {
        width: 252px;
        height: 35px;
        margin: 5px auto 15px auto;
        border: 1px solid rgb(0, 0, 0, 0.3);
        outline: 0;
      }

      > .sign_div {
        width: 257px;
        height: 40px;
        /* border-radius: 3px; */
        margin: 15px auto 30px auto;
        box-sizing: border-box;
        cursor: pointer;
        line-height: 40px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 15px;
        text-align: center;
        cursor: pointer;
        background-color: rgb(0, 0, 0, 0.1);
        color: rgb(0, 0, 0, 0.5);
        &:hover {
          background-color: #ffd900;
          color: #2b2828;
        }
      }
      .line {
        width: 257px;
        height: 1px;
        background-color: rgb(0, 0, 0, 0.2);
      }
      .join {
        width: 257px;
        height: 40px;
        border-radius: 3px;
        margin: 35px auto 15px auto;
        background-color: #2b2828;
        cursor: pointer;
        line-height: 40px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
      }

      > .socialjoin {
        position: absolute;
        box-sizing: border-box;
        width: 257px;
        height: 40px;
        border-radius: 3px;
        border: 1px solid #2b2828;
        cursor: pointer;
        line-height: 40px;
        border-radius: 20px;
        .git_icon {
          position: absolute;
          top: 8px;
          left: 60px;
          width: 20px;
          display: inline-block;
        }
        p {
          float: right;
          width: 230px;
          line-height: 40px;
        }
      }
    }
  }
  @media only screen and (max-width: 768px){
    > .map_modal {
      width: 100%;
      height: 100vh;
      background-color: white;
      position: relative;
      top: 0;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 0px;
      /* background: #fff; */
      border: 1px solid #8b8585;
    }
  }
`;

const MapModal = ({ setMapModal }) => {
  // useState로 Input 값 받기
  let[inputWord, setInputWord] = useState('');
  let[searchWord, setSearchWord] = useState('');
  let[searching, setSearching] = useState(0);
  let[myLocation, setMyLocation] = useState('서대문구'); //default : 내 프로필 구
  let defaultMyLocation = '서대문구';
  let[doroAddress, setDoroAddress] = useState('');
  let[jibunAddress, setJibunAddress] = useState('');
   // Input 값 받는 함수
   const handleChangeSearchWord = (e) => {
    setInputWord(e.target.value);
  }

  // 검색하기 icon 클릭 시 검색 실행되는 함수
  const handleClickSearch = (e) => {
    // axios : 검색 요청
    setSearchWord(`${myLocation} ${inputWord}`);
    setSearching(searching+1);
    console.log(searchWord);
    console.log(searching);
  }

  // Enter 입력 시 검색 실행되는 함수
  const onCheckEnter = (e) => {
    if(e.key === 'Enter') {
      handleClickSearch();
    }
  }

  const handleClickLoginBtn = (e) => {
    // axios로 idValue, passwordValue전송.
  }

  // kakao map api 
  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({zIndex:1});

    let mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = {
            center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
        };  

    // 지도를 생성합니다    
    let map = new kakao.maps.Map(mapContainer, mapOption); 

    // 장소 검색 객체를 생성합니다
    let ps = new kakao.maps.services.Places(map); 

    // 키워드로 장소를 검색합니다
    ps.keywordSearch('홈플러스', placesSearchCB); 
    ps.keywordSearch('슈퍼', placesSearchCB); 
    ps.keywordSearch('마트', placesSearchCB); 
    ps.keywordSearch('백화점', placesSearchCB); 
    
    // 마커 이미지의 이미지 주소입니다
    let imageSrc = "https://media.vlpt.us/images/ez0ez0/post/f1a16c30-2e31-41e0-a99c-b388b24b1cd2/groceries.png"; 
    

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

            for (let i=0; i<data.length; i++) {
                displayMarker(data[i]); 
            }       
        } 
    }

    // 지도에 마커를 표시하는 함수입니다 ---------대형마트,백화점,슈퍼,홈플러스
    function displayMarker(place) {
        // 마커 이미지의 이미지 크기 입니다
        let imageSize = new kakao.maps.Size(44,44); 
        
        // 마커 이미지를 생성합니다    
        let markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        
        // 마커를 생성하고 지도에 표시합니다
        let marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) ,
            image : markerImage
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
    // 검색창에 검색할 경우 ---------------------------------
    
    // 마커 이미지의 이미지 주소입니다
    let imageSrc2 = "https://media.vlpt.us/images/ez0ez0/post/2fa5b882-7250-4dff-8916-f2ce4c061212/your-location%20(1).png";  
    

    //지도상 현재 위치 찾아서 검색범위 설정하는 함수 ----------------------   
    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'idle', function() {
      let center = map.getCenter();
      // console.log(center.getLat(), center.getLng());
      let presentGeocoder = new kakao.maps.services.Geocoder();
      console.log('지도변화',guCodeList[0]['행정구역'])
      let callbackGuCode = function(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            let guCode = result[0].code.slice(0,5);
            // console.log(typeof(guCode),typeof(guCodeList[0]['행정구역']),guCodeList[0]['행정구역']);
            guCodeList.map((el) => {
              if(guCode === `${el['행정구역']}`){setMyLocation(el['구'])}
              else(setMyLocation(defaultMyLocation))
            })  
          }
      };
      presentGeocoder.coord2RegionCode(center.getLng(), center.getLat(), callbackGuCode);
    });

    
    
    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchWord, myPlacesSearchCB);
    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function myPlacesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();

            for (var i=0; i<data.length; i++) {
                displayMarkerSearching(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
            }       

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            map.setBounds(bounds);
        } 
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarkerSearching(place) {
        // 마커 이미지의 이미지 크기 입니다
        let imageSize = new kakao.maps.Size(35, 35); 
        
        // 마커 이미지를 생성합니다    
        let markerImage = new kakao.maps.MarkerImage(imageSrc2, imageSize); 
        
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x), 
            image : markerImage
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
    //클릭한 곳의 위치 찾기-------------------------
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();
    var marker = new kakao.maps.Marker();
    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
          result[0].road_address ? setDoroAddress(result[0].road_address.address_name) : '';
          result[0].address ? setJibunAddress(result[0].address.address_name) : '';
        }
      });
    });

  }, [searching]);

  return (
    <MapModalWrapper>
      <div className="map_modal">
        <div className="close" onClick={() => setMapModal(false)}>
          &times;
        </div>
        <div id='map'> 
        </div>
        <div id='result'> 
          <div>도로명 주소 : {doroAddress}</야>
          <div>도로명 주소 : {jibunAddress}</div>
        </div>
        <div className='search_box'>
          <input className='input' type='text' onChange={handleChangeSearchWord} onKeyPress={onCheckEnter}/>
          <div className='search_btn' onClick={handleClickSearch} ></div>
        </div>
      </div>
    </MapModalWrapper>
  );
};

export default MapModal;
 > .search_box {
      width: 260px;
      height: 375px;
      box-sizing: border-box;
      margin: 65px auto 0 auto;

      > .input {
        width: 252px;
        height: 35px;
        margin: 10px auto;
        outline: none;
        border: 1px solid rgb(0, 0, 0, 0.3);
        outline: 0;
      }

      > .search_btn {
        width: 257px;
        height: 40px;
        /* border-radius: 3px; */
        margin: 15px auto 30px auto;
        box-sizing: border-box;
        cursor: pointer;
        line-height: 40px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 15px;
        text-align: center;
        cursor: pointer;
        background-color: rgb(0, 0, 0, 0.1);
        color: rgb(0, 0, 0, 0.5);
        &:hover {
          background-color: #ffd900;
          color: #2b2828;
        }
      }
      .line {
        width: 257px;
        height: 1px;
        background-color: rgb(0, 0, 0, 0.2);
      }
      .join {
        width: 257px;
        height: 40px;
        border-radius: 3px;
        margin: 35px auto 15px auto;
        background-color: #2b2828;
        cursor: pointer;
        line-height: 40px;
        border-radius: 20px;
        font-weight: 600;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
      }

      > .socialjoin {
        position: absolute;
        box-sizing: border-box;
        width: 257px;
        height: 40px;
        border-radius: 3px;
        border: 1px solid #2b2828;
        cursor: pointer;
        line-height: 40px;
        border-radius: 20px;
        .git_icon {
          position: absolute;
          top: 8px;
          left: 60px;
          width: 20px;
          display: inline-block;
        }
        p {
          float: right;
          width: 230px;
          line-height: 40px;
        }
      }
    }
  }
  @media only screen and (max-width: 768px){
    > .map_modal {
      width: 100%;
      height: 100vh;
      background-color: white;
      position: relative;
      top: 0;
      box-sizing: border-box;
      margin: 0 auto;
      border-radius: 0px;
      /* background: #fff; */
      border: 1px solid #8b8585;
    }
  }
`;

const MapModal = ({ setMapModal }) => {
  // useState로 Input 값 받기
  let[searchWord, setSearchWord] = useState('');
  let[searching, setSearching] = useState(0);

  // Input 값 받는 함수
  const handleChangeSearchWord = (e) => {
    setSearchWord(e.target.value);
  }

  // 검색하기 icon 클릭 시 검색 실행되는 함수
  const handleClickSearch = (e) => {
    // axios : 검색 요청
    setSearching(searching+1)
    console.log(searchWord);
    console.log(searching);
  }

  // Enter 입력 시 검색 실행되는 함수
  const onCheckEnter = (e) => {
    if(e.key === 'Enter') {
      handleClickSearch();
    }
  }

  const handleClickLoginBtn = (e) => {
    // axios로 idValue, passwordValue전송.
  }
  let positions = [];
  marketList.map((el) => {
    let geocoder = new kakao.maps.services.Geocoder(), // 좌표계 변환 객체를 생성합니다
    wtmX = el['좌표정보(X)'], // 변환할 WTM X 좌표 입니다
    wtmY = el['좌표정보(Y)']; // 변환할 WTM Y 좌표 입니다

    // WTM 좌표를 WGS84 좌표계의 좌표로 변환합니다
    geocoder.transCoord(wtmX, wtmY, transCoordCB, {
      input_coord: kakao.maps.services.Coords.WTM, // 변환을 위해 입력한 좌표계 입니다
      output_coord: kakao.maps.services.Coords.WGS84 // 변환 결과로 받을 좌표계 입니다 
      
    });
    function transCoordCB(result, status) {
      console.log(result)
    }
  // kakao map api 
  useEffect(() => {
    let infowindow = new kakao.maps.InfoWindow({zIndex:1}); // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    
    let mapContainer = document.getElementById('map') // 지도를 표시할 div

    let mapOption = {
      // center: new kakao.maps.LatLng(37.55754937234378, 126.98938666353928), // 지도 중심좌표
      center: new kakao.maps.LatLng(37.55494147654123 , 126.98904489292524),
      level:6 // 지도 확대 레벨
    };

    //지도를 표시할 div와 지도 옵션으로 지도를 생성
    let map = new kakao.maps.Map(mapContainer, mapOption);

    

    
      // 좌표 변환 결과를 받아서 처리할 콜백함수 입니다.
      // function transCoordCB(result, status) {
      //   // 정상적으로 검색이 완료됐으면 
      //   if (status === kakao.maps.services.Status.OK) {
      //       // 마커를 변환된 위치에 표시합니다
      //       var marker = new kakao.maps.Marker({
      //           position: new kakao.maps.LatLng(result[0].y, result[0].x), // 마커를 표시할 위치입니다
      //           map: map, // 마커를 표시할 지도객체입니다
      //           title : el['사업장명'] // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      //       })
      //   }
      // }
    
  //클릭한 위도, 경도 위치 알려주는 함수
  kakao.maps.event.addListener(map, 'click', function(mouseEvent) {        
    
    // 클릭한 위도, 경도 정보를 가져옵니다 
    var latlng = mouseEvent.latLng;
    
    var message = '클릭한 위치의 위도는 ' + latlng.getLat() + ' 이고, ';
    message += '경도는 ' + latlng.getLng() + ' 입니다';
    
    var resultDiv = document.getElementById('result'); 
    resultDiv.innerHTML = message;
    
});

  // }, []);

  // useEffect(()=>{
    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
    // var infowindow = new kakao.maps.InfoWindow({zIndex:1});

    // var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    //     mapOption = {
    //         center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
    //         level: 3 // 지도의 확대 레벨
    //     };  

    // // 지도를 생성합니다    
    // var map = new kakao.maps.Map(mapContainer, mapOption); 
    // 장소 검색 객체를 생성합니다
    let ps = new kakao.maps.services.Places(); 

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(searchWord, placesSearchCB); 

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB (data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            var bounds = new kakao.maps.LatLngBounds();

            for (var i=0; i<data.length; i++) {
                displayMarker(data[i]);    
                bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
            }       

            // // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
            // map.setBounds(bounds);
        } 
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place) {
        
        // 마커를 생성하고 지도에 표시합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x) 
        });

        // 마커에 클릭이벤트를 등록합니다
        kakao.maps.event.addListener(marker, 'click', function() {
            // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });
    }
  },[searching]);

  return (
    <MapModalWrapper>
      <div className="map_modal">
        <div className="close" onClick={() => setMapModal(false)}>
          &times;
        </div>
        <div id='map'> 
        </div>
        <div className='search_box'>
          <input className='input' type='text' onChange={handleChangeSearchWord} onKeyPress={onCheckEnter}/>
          <div className='search_btn' onClick={handleClickSearch} ></div>
        </div>
        <div id='result'> 
        </div>

      </div>
    </MapModalWrapper>
  );
};

export default MapModal;
