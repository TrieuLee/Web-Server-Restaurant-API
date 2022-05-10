const { Op } = require("sequelize");

const { Customer } = require("../models");

class CustomerCURD {
  async getCustomer(req, res) {
    try {
      const customers = await Customer.findAll();
      res.json(customers);
    } catch (err) {
      res.status(500).send();
    }
  }
  async createCustomer(req, res) {
    try {
      const { Cus_email, Cus_password, Cus_fullName, Cus_passwordVerify } =
        req.body;

      //validation

      if (!Cus_email || !Cus_password || !Cus_fullName || !Cus_passwordVerify) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (Cus_password.length < 6) {
        return res
          .status(400)
          .json({ errorMessage: "Mật khẩu ít nhất là 6 ký tự!" });
      }

      if (Cus_password !== Cus_passwordVerify) {
        return res
          .status(400)
          .json({ errorMessage: "Mật khẩu xác thực không trùng khớp!" });
      }

      const existingCustomer = await Customer.findOne({
        where: { Cus_email: Cus_email },
      });
      if (existingCustomer) {
        return res.status(400).json({
          errorMessage: "Email đã được sử dụng. Hãy dùng email khác!",
        });
      }

      await Customer.create({
        Cus_email: Cus_email,
        Cus_password: Cus_password,
        Cus_fullName: Cus_fullName,
      });
      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (err) {
      res.status(500).send();
    }
  }
  async updateCustomer(req, res) {
    try {
      const { Cus_email, Cus_fullName } = req.body;
      const idCustomer = req.params.id;

      //validation

      if (!Cus_email || !Cus_fullName) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (!idCustomer) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      const existingCustomer = await Customer.findAll({
        where: {
          Cus_email: Cus_email,
          Cus_id: {
            [Op.not]: idCustomer,
          },
        },
      });
      if (existingCustomer.length > 0) {
        return res.status(400).json({
          errorMessage: "Email đã được sử dụng. Hãy dùng email khác!",
        });
      }
      const checkIDCustomers = await Customer.findByPk(idCustomer);
      if (!checkIDCustomers) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      await checkIDCustomers.update({
        Cus_email: Cus_email,
        Cus_fullName: Cus_fullName,
      });
      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send();
    }
  }
  async deleteCustomer(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkCustomer = await Customer.findByPk(id);
      if (!checkCustomer) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      await checkCustomer.destroy();

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send();
    }
  }
}

module.exports = new CustomerCURD();
