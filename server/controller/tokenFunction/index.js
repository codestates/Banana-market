require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  // access token 생성
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET, { expiresIn: "15s" });
  },
  // refresh token 생성
  generateRefreshToken: (data) => {
    return sign(data, process.env.REFRESH_SECRET, { expiresIn: "30d" });
  },
  // 쿠키로 access token 전달
  sendAccessToken: (res, accessToken) => {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      //   domain: process.env.SERVER_DOMAIN,
      //   path: "/",
      //   secure: true,
      //   sameSite: "none",
    });
  },
  // 쿠키로 refresh token 전달
  sendRefreshToken: (res, refreshToken) => {
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      //   domain: process.env.SERVER_DOMAIN,
      //   path: "/",
      //   secure: true,
      //   sameSite: "none",
    });
  },
  // access token 유효성 확인
  checkAccessToken: (accessToken) => {
    try {
      return verify(accessToken, process.env.ACCESS_SECRET);
    } catch {
      return null;
    }
  },
  // refresh token 유효성 확인
  checkRefreshToken: (refreshToken) => {
    try {
      return verify(refreshToken, process.env.REFRESH_SECRET);
    } catch {
      return null;
    }
  },
};
