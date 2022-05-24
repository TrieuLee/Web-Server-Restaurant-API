const { Table, Restaurant } = require("../models");

class TableController {
  async getTable(req, res) {
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

      const table = await Table.findAll({
        where: {
          Res_id: Res_id,
        },
      });
      res.json(table);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async createTable(req, res) {
    try {
      const { Tbl_name, Tbl_deposit, Tbl_number } = req.body;
      const Res_id = req.params.id;
      if (!Tbl_name || !Tbl_deposit || !Tbl_number) {
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
        Tbl_name: Tbl_name,
        Tbl_deposit: Tbl_deposit,
        Tbl_number: Tbl_number,
        Res_id: Res_id,
        Tbl_status: true,
      });

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async updateTable(req, res) {
    try {
      const { Tbl_name, Tbl_deposit, Tbl_number, Tbl_status } = req.body;
      const Tbl_id = req.params.id;

      if (!Tbl_name || !Tbl_deposit | !Tbl_number | !Tbl_status) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (!Tbl_id) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const existingTable = await Table.findByPk(Tbl_id);
      if (!existingTable) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      await existingTable.update({
        Tbl_name: Tbl_name,
        Tbl_deposit: Tbl_deposit,
        Tbl_number: Tbl_number,
        Tbl_status: Tbl_status,
      });

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async deleteTable(req, res) {
    try {
      const id = req.params.id;
      if (!id) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      const existingTable = await Table.findByPk(id);

      if (!existingTable) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }
      await existingTable.destroy();

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send();
    }
  }
}
module.exports = new TableController();
