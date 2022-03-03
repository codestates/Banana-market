const dotenv = require("dotenv");
dotenv.config();

const dbCheck = require('./models')
const { User } = require('./models')

console.log({
  HTTP_PORT: process.env.HTTP_PORT,
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  databaseName: process.env.DATABASE_NAME,
  user_name: process.env.DATABASE_USERNAME,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
  AKEY: process.env.AKEY,
  ASECRET: process.env.ASECRET,
});

console.log("db 모델 있는지?", dbCheck)

// const userCheck = async() => {
//   const userOne = await User.findByPk(1)
//   return userOne.get({plain:true})
// }

// const testuser = userCheck();
// console.log("1번 유저 찾아", testuser)
