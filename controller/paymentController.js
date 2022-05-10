const { Payment, ListOrderFood } = require("../models");

class PaymentController {
  async getPayment(req, res) {
    try {
      const payment = await Payment.findAll({
        include: ListOrderFood,
      });
      res.json(payment);
    } catch (error) {}
  }
  async createPayment(req, res) {
    try {
      const {
        Pm_method,
        Pm_status,
        Pm_totalMoney,
        Pm_dateTimePayment,
        Orf_id,
      } = req.body;

      if (!Pm_method || !Pm_status || !Pm_totalMoney || !Pm_dateTimePayment) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (!Orf_id) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkOrderList = await ListOrderFood.findByPk(Orf_id);
      if (!checkOrderList) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      await Payment.create({
        Pm_method: Pm_method,
        Pm_status: Pm_status,
        Pm_totalMoney: Pm_totalMoney,
        Pm_dateTimePayment: Pm_dateTimePayment,
        Orf_id: Orf_id,
      });
      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {}
  }
  async updatePayment(req, res) {
    try {
      const {
        Pm_method,
        Pm_status,
        Pm_totalMoney,
        Pm_dateTimePayment,
        Orf_id,
      } = req.body;

      const Pm_id = req.params.id;

      if (!Pm_method || !Pm_status || !Pm_totalMoney || !Pm_dateTimePayment) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (!Orf_id || !Pm_id) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkOrderList = await ListOrderFood.findByPk(Orf_id);
      const checkPaymentList = await Payment.findAll({
        where: {
          Pm_id: Pm_id,
          Orf_id: Orf_id,
        },
      });
      if (!checkOrderList || !checkPaymentList) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      await checkPaymentList.update({
        Pm_method: Pm_method,
        Pm_status: Pm_status,
        Pm_totalMoney: Pm_totalMoney,
        Pm_dateTimePayment: Pm_dateTimePayment,
      });

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {}
  }
  async deletePayment(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      const checkPayment = await Payment.findByPk(id);

      if (!checkPayment) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      await checkPayment.destroy();

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send();
    }
  }
}

module.exports = new PaymentController();
