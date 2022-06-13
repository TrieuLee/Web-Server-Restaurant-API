const { Op } = require("sequelize");

const { Restaurant, Food } = require("../models");

class FindByOption {
  async findRestaurant(req, res) {
    try {
      const { keyfind } = req.body;
      console.log(keyfind);
      if (keyfind === "") {
        const res = await Restaurant.findAll();
        res.json(res);
      } else {
        const { count, rows } = await Restaurant.findAndCountAll({
          where: {
            [Op.or]: [
              {
                Res_name: {
                  [Op.like]: `%${keyfind}%`,
                },
              },
              {
                Res_address: {
                  [Op.like]: `%${keyfind}%`,
                },
              },
            ],
          },
          limit: 10,
        });
        res.json({ count, rows });
      }
    } catch (error) {
      res.status(500).send();
    }
  }

  async findFood(req, res) {
    try {
      const { keyfind } = req.body;
      const { count, rows } = await Food.findAndCountAll({
        where: {
          Fd_name: {
            [Op.like]: `%${keyfind}%`,
          },
        },
        limit: 10,
      });
      res.json({ count, rows });
    } catch (error) {
      res.status(500).send();
    }
  }
}
module.exports = new FindByOption();
