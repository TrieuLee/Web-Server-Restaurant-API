const { ListOrderFood, Customer, Food } = require("../models");

class ListOrderFoodController {
  async getListOrderFood(req, res) {
    try {
      const Cus_id = req.params.id;
      if (!Cus_id) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkCustomer = await Customer.findByPk(Cus_id);
      if (!checkCustomer) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const listOrderFoods = await ListOrderFoodController.findAll({
        where: {
          Cus_id: Cus_id,
        },
        include: Food,
      });
      res.json(listOrderFoods);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async createListOrderFood(req, res) {
    try {
      const { Ord_amount, Ord_totalMoney, Fd_id, Cus_id } = req.body;

      if (!Ord_amount || !Ord_totalMoney) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (!Fd_id || !Cus_id) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkCustomer = await Customer.findByPk(Cus_id);
      const checkFood = await Food.findByPk(Fd_id);

      if (!checkCustomer || !checkFood) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      await ListOrderFoodController.create({
        Ord_amount: Ord_amount,
        Ord_totalMoney: Ord_totalMoney,
        Fd_id: Fd_id,
        Cus_id: Fd_id,
      });
      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateListOrderFood(req, res) {
    try {
      const { Ord_amount, Ord_totalMoney, Fd_id, Cus_id } = req.body;
      const Orf_id = req.params.id;

      if (!Ord_amount || !Ord_totalMoney) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (!Fd_id || !Cus_id || !Orf_id) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkCustomer = await Customer.findByPk(Cus_id);
      const checkFood = await Food.findByPk(Fd_id);

      if (!checkCustomer || !checkFood) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const existingListOrder = await ListOrderFoodController.findAll({
        where: {
          Orf_id: Orf_id,
          Fd_id: Fd_id,
          Cus_id: Cus_id,
        },
      });

      if (!existingListOrder) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      await existingListOrder.update({
        Ord_amount: Ord_amount,
        Ord_totalMoney: Ord_totalMoney,
      });
      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async deleteListOrderFood(req, res) {
    try {
      const Orf_id = req.params.id;
      if (!Orf_id) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      const checkListOrderFood = await ListOrderFoodController.findByPk(Orf_id);

      if (!checkListOrderFood) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      await checkListOrderFood.destroy();

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = new ListOrderFoodController();
