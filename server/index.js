const express = require("express");
const app = express();
const indexRouter = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 80;
const models = require("./models/index.js");
require("dotenv").config();

// ? 데이터베이스 연결 확인
models.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch((err) => {
    console.log("연결 실패");
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser(process.env.SECRET));

app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
  })
);

app.use("/", indexRouter);
app.get("/", (req, res) => {
  res.send(`🍌 ~~ Banana Market ~~ 🍌`);
});

app.listen(port, () => {
  console.log(`🍌 ~~ Banana Market 서버가 작동 중입니다 ~~ 🍌`);
});
