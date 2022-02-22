import React, { useState } from "react";
import styled from "styled-components";

const SetModalDiv = styled.div`
  width: 330px;
  height: 712px;
  background-color: darksalmon;
  position: absolute;
  right: 0%;
  z-index: 1;
  @media screen and (max-width: 768px) {
    height: 745px;
  }
  .close {
    width: 28px;
    height: 28px;
    color: #4c4c4c;
    float: right;
    font-size: 30px;
    cursor: pointer;
  }
  .user {
    width: 250px;
    min-height: 130px;
    margin: 90px auto 0 auto;
    position: relative;
    border-bottom: 1px solid #ddd;
    @media screen and (max-width: 768px) {
      margin: 100px auto 0 auto;
    }
    p {
      position: absolute;
      top: 3%;
    }
    .user_info {
      font-size: 11px;
      position: absolute;
      bottom: 30%;
      line-height: 1.5;
    }
  }
  .user_list {
    width: 270px;
    height: 260px;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    margin: 50px auto;
    @media screen and (max-width: 768px) {
      height: 258px;
    }
    .grid {
      display: grid;
      grid-template-columns: auto;
      padding: 10px;
      grid-gap: 10px;
      li {
        min-height: 40px;

        div {
          float: left;
        }
        .user_img {
          width: 40px;
          height: 40px;
          border-radius: 50px;
          background-color: #ddd;
        }
        .user_id {
          margin-left: 10px;
          width: 140px;
          height: 40px;
          font-size: 15px;
          color: #2b2828;
          line-height: 40px;
        }
        .user_out {
          height: 25px;
          width: 60px;
          margin-top: 7px;
          border: 1px solid #ff3c3c;
          box-sizing: border-box;
          font-size: 12px;
          line-height: 24px;
          border-radius: 30px;
          cursor: pointer;
          color: #ff3c3c;
          text-align: center;
        }
      }
    }
  }
  .user_list::-webkit-scrollbar {
    display: none;
  }
  .exit {
    width: 250px;
    height: 45px;
    border: 1px solid #2b2828;
    box-sizing: border-box;
    margin: 50px auto 0 auto;
    /* border-radius: 10px; */
    cursor: pointer;
    line-height: 45px;
    text-align: center;
    &:hover {
      background-color: rgb(0, 0, 0, 0.1);
      color: #2b2828;
    }
  }
`;

const ToggleContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0%;
  cursor: pointer;

  > .toggle-container {
    width: 50px;
    height: 24px;
    border-radius: 30px;
    /* background: linear-gradient(to left, #333, #333 50%, #eee 75%, #333 75%); */
    background: linear-gradient(to left, #ddd 50%, #ffe249 50%);
    background-size: 200% 100%;
    background-position: right bottom;
    transition-duration: 1s;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
    &.toggle--checked {
      /* background-color: #ddd; */
      background-position: left bottom;
    }
  }

  > .toggle-circle {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #ffffff;
    transition-duration: 0.7s;
    // TODO : .toggle--checked 클래스가 활성화 되었을 경우의 CSS를 구현합니다.
    &.toggle--checked {
      left: 28px;
    }
  }
`;
const Desc = styled.div`
  // TODO : 설명 부분의 CSS를 구현합니다.
  position: absolute;
  right: 25%;
  top: 2%;
  font-size: 15px;
  color: #2b2828;
  /* text-align: center; */
`;

const ExitModalDiv = styled.div`
  width: 330px;
  height: 710px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgb(0, 0, 0, 0.6);
  .exit_modal {
    width: 250px;
    height: 180px;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    .exit_title {
      text-align: center;
      width: 220px;
      margin: 30px auto 15px auto;
      font-weight: 600;
    }
    .exit_info {
      width: 200px;
      margin: 0 auto;
      font-size: 11px;
      margin: 0 auto 25px auto;
      text-align: center;
      line-height: 1.5;
      color: #4c4c4c;
    }

    .exit_btn {
      width: 210px;
      height: 30px;
      margin: 0 auto;
      > div {
        float: left;
      }
      .cancel {
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #f4f4f4;
        font-size: 13px;
        cursor: pointer;
      }
      .ok {
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: #c4c4c4;
        font-size: 13px;
        float: right;
        cursor: pointer;
      }
    }
  }
`;

const SetModal = ({ setSecessionModal }) => {
  const [isOn, setisOn] = useState(false);
  const [existBtn, setExistBtn] = useState(false);
  const [outBtn, setOutBtn] = useState(false);
  const fakelist = [1, 2, 3, 4, 1, 1];
  const [list, setList] = useState(fakelist);

  return (
    <>
      <SetModalDiv>
        <div className="close" onClick={() => setSecessionModal(false)}>
          &times;
        </div>

        <div className="user">
          <p
            style={{
              fontSize: "16px",
            }}
          >
            인원모집
          </p>
          <ToggleContainer>
            <ToggleContainer
              onClick={() => setisOn(!isOn)}
              // TODO : 클릭하면 토글이 켜진 상태(isOn)를 boolean 타입으로 변경하는 메소드가 실행되어야 합니다.
            >
              {/* TODO : 아래에 div 엘리먼트 2개가 있습니다. 각각의 클래스를 'toggle-container', 'toggle-circle' 로 지정하세요. */}
              {/* TIP : Toggle Switch가 ON인 상태일 경우에만 toggle--checked 클래스를 div 엘리먼트 2개에 모두 추가합니다. 조건부 스타일링을 활용하세요. */}
              <div
                className={`toggle-container ${isOn ? "" : "toggle--checked"}`}
              />
              <div
                className={`toggle-circle ${isOn ? "" : "toggle--checked"}`}
              />
            </ToggleContainer>
          </ToggleContainer>
          <div className="user_info">
            인원모집 마감이 ‘OFF’ 이 되면 인원모집이 마감됩니다.<br></br>
            새로운 참가자는 더 이상 거래참가를 할 수 없습니다.
          </div>
          {isOn ? <Desc>OFF</Desc> : <Desc>ON</Desc>}
        </div>

        <div className="user_list">
          <ul className="grid">
            {list.map((el) => (
              <li>
                <div className="user_img"></div>
                <div className="user_id">바니바니바나나</div>
                <div className="user_out" onClick={() => setOutBtn(true)}>
                  내보내기
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="exit" onClick={() => setExistBtn(true)}>
          채팅방 나가기
        </div>
        {existBtn === true ? (
          <ExitModal setExistBtn={setExistBtn}></ExitModal>
        ) : null}
        {outBtn === true ? <UserOut setOutBtn={setOutBtn}></UserOut> : null}
      </SetModalDiv>
    </>
  );
};

function ExitModal({ setExistBtn }) {
  return (
    <ExitModalDiv>
      <div className="exit_modal">
        <div className="exit_title">채팅방을 정말 나가시겠습니까 ?</div>
        <div className="exit_info">
          채팅방을 나가시는 경우, 해당 거래 참여가 <br></br>취소되고 대화 내용이
          모두 삭제됩니다.
        </div>
        <div className="exit_btn">
          <div className="cancel" onClick={() => setExistBtn(false)}>
            취소하기
          </div>
          <div className="ok">나가기</div>
        </div>
      </div>
    </ExitModalDiv>
  );
}
function UserOut({ setOutBtn }) {
  return (
    <ExitModalDiv>
      <div className="exit_modal">
        <div className="exit_title">이 참가자를 내보내시겠습니까 ?</div>
        <div className="exit_info">
          내보내진 참가자는 <br></br>더 이상 거래에 참여할 수 없습니다.
        </div>
        <div className="exit_btn">
          <div className="cancel" onClick={() => setOutBtn(false)}>
            취소하기
          </div>
          <div className="ok">내보내기</div>
        </div>
      </div>
    </ExitModalDiv>
  );
}

export default SetModal;
