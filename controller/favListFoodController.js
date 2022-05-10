const { FavListFood, Customer, Food } = require("../models");

class FavListFoodCURD {
  async getFavListFood(req, res) {
    try {
      const { Cus_id } = req.body;
      const listFavoritesFoods = await FavListFood.findAll({
        where: {
          Cus_id: Cus_id,
        },
        include: Food,
      });

      res.json(listFavoritesFoods);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async getAllFavFood(req, res) {
    try {
      const listFavoritesFoods = await FavListFood.findAll();

      res.json(listFavoritesFoods);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async createFavListFood(req, res) {
    try {
      const { Cus_id, Food_id } = req.body;
      // validation

      if (!Cus_id || !Food_id) {
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

      const checkFood = await Food.findByPk(Food_id);

      if (!checkFood) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const existingFavList = await FavListFood.findAll({
        where: {
          Res_id: Food_id,
          Cus_id: Cus_id,
        },
      });

      if (existingFavList.length > 0) {
        return res.status(400).json({
          errorMessage: "Nhà hàng này đã có trong danh sách yêu thích của bạn",
        });
      }

      await FavListFood.create({
        Res_id: Food_id,
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
  async deleteFavListFood(req, res) {
    try {
      const { Cus_id, Food_id } = req.body;

      // validation

      if (!Cus_id || !Food_id) {
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

      const checkFood = await Food.findByPk(Food_id);
      if (!checkFood) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      const existingFavList = await FavListFood.findOne({
        where: {
          Cus_id: Cus_id,
          Res_id: Food_id,
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

module.exports = new FavListFoodCURD();
