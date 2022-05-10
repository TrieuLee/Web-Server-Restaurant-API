const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = (expressApp) => {
  expressApp.use(express.json());
  expressApp.use(cookieParser());
  expressApp.use(
    cors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true,
    })
  );
};
