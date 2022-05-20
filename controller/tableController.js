const { Table, Restaurant } = require("../models");

class TypeofFoodController {
  async getTypeofFood(req, res) {
    try {
      const Res_id = req.params.id;

      if (!Res_id) {
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

      const typeOfFood = await Table.findAll({
        where: {
          Res_id: Res_id,
        },
      });
      res.json(typeOfFood);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async createTypeFood(req, res) {
    try {
      const { ToF_name } = req.body;
      const Res_id = req.params.id;
      if (!ToF_name) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (!Res_id) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkIdRestaurant = await Restaurant.findByPk(Res_id);

      if (!checkIdRestaurant) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      await Table.create({
        ToF_name: ToF_name,
        ToF_state: true,
        Res_id: Res_id,
      });

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateTypeFood(req, res) {
    try {
      const { ToF_name, ToF_state } = req.body;
      const ToF_id = req.params.id;

      if (!ToF_name || !ToF_state) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (!ToF_id) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const existingTypeofFood = await Table.findByPk(ToF_id);
      console.log(existingTypeofFood);
      if (!existingTypeofFood) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      // const checkRestaurant = await Restaurant.findByPk(Res_id);
      // if (!checkRestaurant) {
      //   return res.status(400).json({
      //     errorMessage:
      //       "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
      //   });
      // }

      await existingTypeofFood.update({
        ToF_name: ToF_name,
        ToF_state: ToF_state,
      });

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async deleteTypeFood(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      const existingTypeofFood = await Table.findByPk(id);

      if (!existingTypeofFood) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      await existingTypeofFood.destroy();

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send();
    }
  }
}
module.exports = new TypeofFoodController();
