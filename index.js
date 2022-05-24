const express = require("express");

const app = express();
const port = 5001;

const loaders = require("./loaders");

(async () => {
  await loaders(app);

  // set up router

  app.use("/customer", require("./routers/customerRouter"));
  app.use("/founder", require("./routers/founderRouter"));
  app.use("/restaurant", require("./routers/restaurantRouter"));
  app.use("/favListRestaurant", require("./routers/favListRestaurantRouter"));
  app.use("/food", require("./routers/foodRouter"));
  app.use("/typeofFood", require("./routers/typeOfFoodRouter"));
  app.use("/favListFood", require("./routers/favListFoodRouter"));
  app.use("/listOrderFood", require("./routers/listOrderFoodRouter"));
  app.use("/table", require("./routers/tableRouter"));

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})();
