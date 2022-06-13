const { Op } = require("sequelize");

const { Restaurant, Founder, TypeofFood } = require("../models");

class RestaurantController {
  async getRestaurantList(req, res) {
    try {
      const restaurants = await Restaurant.findAll();
      res.json(restaurants);
    } catch (error) {
      res.status(500).send();
    }
  }
  async getRestaurantByFounder(req, res) {
    try {
      const restaurants = await Restaurant.findAll({
        where: {
          Fdr_id: req.params.idparner,
        },
      });
      res.json(restaurants);
    } catch (error) {
      res.status(500).send();
    }
  }

  async createRestaurants(req, res) {
    try {
      const {
        Res_name,
        Res_phone,
        Res_address,
        Res_description,
        Res_time_open,
        Res_time_closed,
        Res_email,
        Res_image,
      } = req.body;
      const Fdr_id = req.params.idparner;
      //validation
      if (
        !Res_name ||
        !Res_phone ||
        !Res_address ||
        !Res_description ||
        !Res_time_open ||
        !Res_time_closed ||
        !Res_email ||
        !Res_image
      ) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }
      if (!Fdr_id) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const existingRestaurant = await Restaurant.findOne({
        where: { Res_email: Res_email },
      });

      if (existingRestaurant) {
        return res.status(400).json({
          errorMessage: "Email đã được sử dụng. Hãy dùng email khác!",
        });
      }

      await Restaurant.create({
        Res_name: Res_name,
        Res_phone: Res_phone,
        Res_address: Res_address,
        Res_description: Res_description,
        Res_time_open: Res_time_open,
        Res_time_closed: Res_time_closed,
        Res_email: Res_email,
        Res_image: Res_image,
        Fdr_id: Fdr_id,
      });
      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateRestaurant(req, res) {
    try {
      const {
        Res_name,
        Res_phone,
        Res_address,
        Res_description,
        Res_time_open,
        Res_time_closed,
        Res_email,
        Res_image,
      } = req.body;
      const idRestaurant = req.params.id;
      const Fdr_id = req.params.idparner;
      //validation
      if (
        !Res_name ||
        !Res_phone ||
        !Res_address ||
        !Res_description ||
        !Res_time_open ||
        !Res_time_closed ||
        !Res_email ||
        !Res_image
      ) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (!idRestaurant || !Fdr_id) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkRestaurant = await Restaurant.findByPk(idRestaurant);

      if (!checkRestaurant || checkRestaurant.Fdr_id !== Fdr_id) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const existingRestaurant = await Restaurant.findAll({
        where: {
          Res_email: Res_email,
          Res_id: {
            [Op.not]: idRestaurant,
          },
        },
      });
      if (existingRestaurant.length > 0) {
        return res.status(400).json({
          errorMessage: "Email đã được sử dụng. Hãy dùng email khác!",
        });
      }

      await checkRestaurant.update({
        Res_name: Res_name,
        Res_phone: Res_phone,
        Res_address: Res_address,
        Res_description: Res_description,
        Res_time_open: Res_time_open,
        Res_time_closed: Res_time_closed,
        Res_email: Res_email,
        Res_image: Res_image,
      });
      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async deleteRestaurant(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      const checkRestaurant = await Restaurant.findByPk(id);

      if (!checkRestaurant) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      await checkRestaurant.destroy();

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send();
    }
  }
}

module.exports = new RestaurantController();
