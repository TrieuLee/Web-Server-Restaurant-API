const { FavListRestaurant, Customer, Restaurant } = require("../models");

class favListRestaurant {
  async getFavList(req, res) {
    try {
      const { Cus_id } = req.body;
      const listFavoritesRestaurants = await FavListRestaurant.findAll({
        where: {
          Cus_id: Cus_id,
        },
        include: Restaurant,
      });

      res.json(listFavoritesRestaurants);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getAllList(req, res) {
    try {
      const listFavoritesRestaurants = await FavListRestaurant.findAll();

      res.json(listFavoritesRestaurants);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async postNewList(req, res) {
    try {
      const { Cus_id, Res_id } = req.body;


      // validation

      if (!Cus_id || !Res_id) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      const checkCustomer = await Customer.findByPk(Cus_id);
      if (!checkCustomer) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkRestaurant = await Restaurant.findByPk(Res_id);

      if (!checkRestaurant) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const existingFavList = await FavListRestaurant.findAll({
        where: {
          Res_id: Res_id,
          Cus_id: Cus_id,
        },
      });

      if (existingFavList.length > 0) {
        return res.status(400).json({
          errorMessage: "Nhà hàng này đã có trong danh sách yêu thích của bạn",
        });
      }

      await FavListRestaurant.create({
        Res_id: Res_id,
        Cus_id: Cus_id,
      });
      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteList(req, res) {
    try {
      const { Cus_id, Res_id } = req.body;

      // validation

      if (!Cus_id || !Res_id) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      const checkCustomer = await Customer.findByPk(Cus_id);
      if (!checkCustomer) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkRestaurant = await Restaurant.findByPk(Res_id);
      if (!checkRestaurant) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      const existingFavList = await FavListRestaurant.findOne({
        where: {
          Cus_id: Cus_id,
          Res_id: Res_id,
        },
      });

      await existingFavList.destroy();
      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new favListRestaurant();
