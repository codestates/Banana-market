const express = require('express');
const app = express();
const indexRouter = require('./routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const models = require('./models/index.js');
const { sequelize } = require('./models/index.js');
require('dotenv').config();

sequelize
  .authenticate()
  .then(() => {
    console.log(' 😈 Connection has been established successfully.');
  })
  .catch((err) => {
    console.error(' 👿 Unable to connect to the database:', err);
  });

// sequelize.sync();
// sequelize.sync({ alter: true });
//   .then(()=> {
//     console.log('🤢 re-sync db.')
//   })
//   .catch(err => {
//     console.log('🤮 re-sync error: ', err)
//   })

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: ['https://bananamarket.tk', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS', 'PUT'],
  })
);

app.use('/', indexRouter);
app.get('/', (req, res) => {
  res.send(`🍌 ~~ Banana Market ~~ 🍌`);
});

// http server
const http = require('http');
const server = http.createServer(app);

// socket.io server
const socketHandler = require('./socket');
const socket = require('socket.io');
const io = socket(server, {
  cors: {
    origin: true,
    credentials: true,
  },
});

socketHandler(io);

server.listen(HTTP_PORT, () => {
  console.log(
    `🍌 ~~ Banana Market 서버가 ${HTTP_PORT}번 포트에서  작동 중입니다 ~~ 🍌`
  );
});
