require("dotenv").config();

module.exports = {
  DATABASE: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_URI: process.env.DB_URI,
  },
  PORT: 5001,
  JWT_SECRET: process.env.JWT_SECRET,
};
