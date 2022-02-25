const dotenv = require("dotenv");
dotenv.config();

console.log({
  host: process.env.DATABASE_HOST,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  databaseName: process.env.DATABASE_NAME,
  user_name: process.env.DATABASE_USERNAME,
  EMAIL: process.env.EMAIL,
  PASSWRD: process.env.PASSWRD,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
});