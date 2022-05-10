const { Food, TypeofFood } = require("../models");

class FoodController {
  async getFood(res, req) {
    try {
      const { ToF_id } = req.body;
      const lstFood = await Food.FindAll({
        where: {
          ToF_id: ToF_id,
        },
      });

      res.json(lstFood);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async createFood(res, req) {
    try {
      const {
        Fd_name,
        Fd_price,
        Fd_measureUnit,
        Fd_description,
        Fd_foodStatus,
        Fd_image,
        ToF_id,
      } = req.body;
      // validation

      if (
        !Fd_name ||
        !Fd_price ||
        !Fd_measureUnit ||
        !Fd_description ||
        !Fd_foodStatus ||
        !Fd_image
      ) {
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

      const checkIdTypeofFood = await TypeofFood.FindAll({
        where: {
          ToF_id: ToF_id,
        },
      });

      if (!checkIdTypeofFood) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      await Food.create({
        Fd_name: Fd_name,
        Fd_price: Fd_price,
        Fd_measureUnit: Fd_measureUnit,
        Fd_description: Fd_description,
        Fd_foodStatus: Fd_foodStatus,
        ToF_id: ToF_id,
        Fd_image: Fd_image,
      });

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async putFood(res, req) {
    try {
      const {
        Fd_name,
        Fd_price,
        Fd_measureUnit,
        Fd_description,
        Fd_foodStatus,
        Fd_image,
        ToF_id,
      } = req.body;
      const idFood = req.params.id;

      // validation

      if (
        !Fd_name ||
        !Fd_price ||
        !Fd_measureUnit ||
        !Fd_description ||
        !Fd_foodStatus ||
        !Fd_image
      ) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }
      if (!idFood || !ToF_id) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkTypeOfFood = await TypeofFood.findByPk(ToF_id);
      if (!checkTypeOfFood) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const existingFood = await Food.FindByPK(idFood);

      if (!existingFood) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      await Food.update({
        Fd_name: Fd_name,
        Fd_price: Fd_price,
        Fd_measureUnit: Fd_measureUnit,
        Fd_description: Fd_description,
        Fd_foodStatus: Fd_foodStatus,
        Fd_image: Fd_image,
      });

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteFood(res, req) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      const checkFood = await Food.findByPk(id);

      if (!checkFood) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      await checkFood.destroy();

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send();
    }
  }
}

module.exports = new FoodController();
