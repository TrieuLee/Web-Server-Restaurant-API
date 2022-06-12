const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

module.exports = (expressApp) => {
  expressApp.use(express.json());
  expressApp.use(cookieParser());
  expressApp.use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://localhost:3001",
        "https://v2restaurantparnerhuflit.netlify.app/",
        "https://g08-cusrestaurant-traveloka.surge.sh/",
        "http://g08-restaurant-traveloka.surge.sh/",
      ],
      credentials: true,
    })
  );
};
