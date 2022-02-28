// initialState.js는 :: state초기값 모아두는 파일
export const initialStateLogin = false;
export const initialStateUserInfo = {
  userId: null,
  nickName: null,
  email: null,
  profileImage: null,
  region: null,
  block: null,
  type: null,
  totalTrade: null,
};
export const initialStateSearch = {
  searchWord: '',
  searchCount: 0,
  searchPageNum: 0,
};
export const initialStateSearchList = [];

export const initialList = [];

export const initiaPostDetail = {
  post: {
    address: null,
    category: null,
    content: null,
    currentMate: null,
    date: null,
    id: null,
    image: null,
    market: null,
    region: null,
    status: null,
    time: null,
    title: null,
    totalMate: null,
    tradeType: null,
    url:null,
  },
  postWriter: {
    userId: null,
    isMyPost: null,
    name: null,
    profileImage: null,
    region: null,
    totalTrade: null,
  },
};
