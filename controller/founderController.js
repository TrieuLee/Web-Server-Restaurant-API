const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/index");
const { Founder, Restaurant, TypeofFood } = require("../models");

class FounderController {
  async getFounder(req, res) {
    try {
      const founders = await Founder.findAll();
      res.json(founders);
    } catch (error) {
      res.status(500).send();
    }
  }
  async getFounderByID(req, res) {
    try {
      const user = await Founder.findAll({
        where: {
          Fdr_id: req.user.toString(),
        },
        include: Restaurant,
      });
      res.json(user);
    } catch (error) {
      res.status(500).send();
    }
  }
  async createFounder(req, res) {
    try {
      const { Fdr_email, Fdr_fullName, Fdr_password, Fdr_passwordVerify } =
        req.body;
      // validation

      if (!Fdr_email || !Fdr_fullName || !Fdr_password || !Fdr_passwordVerify) {
        return res
          .status(404)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (Fdr_password.length < 6) {
        return res
          .status(400)
          .json({ errorMessage: "Mật khẩu ít nhất là 6 ký tự!" });
      }

      if (Fdr_password !== Fdr_passwordVerify) {
        return res
          .status(400)
          .json({ errorMessage: "Mật khẩu xác thực không trùng khớp!" });
      }

      const existingFounder = await Founder.findAll({
        where: { Fdr_email: Fdr_email },
      });

      if (existingFounder.length > 0) {
        return res.status(400).json({
          errorMessage: "Email đã được sử dụng. Hãy dùng email khác!",
        });
      }
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(Fdr_password, salt);
      const saveFounder = await Founder.create({
        Fdr_email: Fdr_email,
        Fdr_fullName: Fdr_fullName,
        Fdr_password: passwordHash,
      });

      // create a JWT token

      const token = jwt.sign(
        {
          id: saveFounder.Fdr_id,
        },
        process.env.JWT_SECRET
      ); // id from mongdb + đuôi password generator

      // tạo jsonwebtoken cho để lấy token cho user

      res.cookie("token", token, { httpOnly: true }).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async updateFounder(req, res) {
    try {
      const { Fdr_email, Fdr_fullName } = req.body;
      const Fdr_id = req.user.toString();
      //validation

      if (!Fdr_email || !Fdr_fullName) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (!Fdr_id) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkIDFounders = await Founder.findByPk(Fdr_id);
      if (!checkIDFounders) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const existingFounder = await Founder.findAll({
        where: {
          Fdr_email: Fdr_email,
          Fdr_id: {
            [Op.not]: Fdr_id,
          },
        },
      });

      if (existingFounder.length > 0) {
        return res.status(400).json({
          errorMessage: "Email đã được sử dụng. Hãy dùng email khác!",
        });
      }

      await checkIDFounders.update({
        Fdr_email: Fdr_email,
        Fdr_fullName: Fdr_fullName,
      });
      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send();
    }
  }
  async deleteFounder(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      const checkFounder = await Founder.findByPk(id);
      if (!checkFounder) {
        return res.status(404).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      await checkFounder.destroy();

      res.json({
        status: "success",
        msg: "Success!",
      });
    } catch (error) {
      res.status(500).send();
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;
      // Validation

      if (!email || !password) {
        return res
          .status(400)
          .json({ errorMessage: "Bạn phải điền đầy đủ các thông tin!" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ errorMessage: "Mật khẩu ít nhất là 6 ký tự!" });
      }

      // get account

      const existingFounder = await Founder.findOne({
        where: {
          Fdr_email: email,
        },
      });
      if (!existingFounder) {
        return res.status(400).json({
          errorMessage: "Sai tài khoản hoặc mật khẩu. Vui lòng nhập lại.",
        });
      }

      const correctPassword = await bcrypt.compare(
        password,
        existingFounder.dataValues.Fdr_password
      );

      if (!correctPassword) {
        return res.status(400).json({
          errorMessage: "Sai tài khoản hoặc mật khẩu. Vui lòng nhập lại.",
        });
      }

      // create a JWT token

      const token = jwt.sign(
        {
          id: existingFounder.dataValues.Fdr_id,
        },
        JWT_SECRET
      ); // id from mongdb + đuôi password generator
      console.log({ token }, "hi");
      res
        .cookie("token", token, {
          httpOnly: true,
          sameSite: "none",
          secure: false,
        })
        .send();
      // tạo jsonwebtoken cho để lấy token cho user

      // res.json({
      //   status: "success",
      //   msg: "Đăng nhập thành công !",
      //   data: existingFounder.dataValues,
      // });
    } catch (err) {
      res.status(500).send();
    }
  }
  async loggedIn(req, res) {
    try {
      const user = await Founder.findByPk(req.user.toString());
      res.json(user);
    } catch (err) {
      return res.json(null);
    }
  }
  async logout(req, res) {
    try {
      res.clearCookie("token").send();
    } catch (err) {
      return res.json(null);
    }
  }
  async changPassword(req, res) {
    try {
      const { email, password, newPassword, passwordVerify } = req.body;

      // Validation

      if (!email || !password || !newPassword || !passwordVerify) {
        return res.status(400).json({
          errorMessage: "Bạn phải điền đầy đủ các thông tin!",
        });
      }

      if (password === newPassword) {
        return res.status(400).json({
          errorMessage: "Mật khẩu mới trùng khớp với mật khẩu hiện tại",
        });
      }

      if (passwordVerify !== newPassword) {
        return res.status(400).json({
          errorMessage: "Xác thực mật khẩu sai",
        });
      }

      if (newPassword.length < 6) {
        return res.status(400).json({
          errorMessage: "Mật khẩu ít nhất có độ dài 6 ký tự",
        });
      }

      // xữ lý dữ liệu đầu vào

      const existingFounder = await Founder.findByPk(req.user.toString());

      if (!existingFounder) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      if (existingFounder.Fdr_email !== email) {
        return res.status(401).json({
          errorMessage: "Sai tài khoản hoặc mật khẩu",
        });
      }

      const correctPassword = await bcrypt.compare(
        password,
        existingFounder.Fdr_password
      );

      if (!correctPassword) {
        return res.status(401).json({
          errorMessage: "Sai tài khoản hoặc mật khẩu",
        });
      }

      // hash the password

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(newPassword, salt);

      // update the user in the database

      const updateUser = await existingFounder.update({
        Fdr_password: passwordHash,
      });

      //const savedUser = await existingUser.save();

      // create the JWT token

      const token = jwt.sign(
        {
          id: existingFounder.dataValues.Fdr_id,
        },
        JWT_SECRET
      ); // id from mongdb + đuôi password generator

      // tạo jsonwebtoken cho để lấy token cho user

      res.cookie("token", token, { httpOnly: true }).send();
    } catch (err) {
      res.status(500).send(err);
    }
  }
  async resetPassword(req, res) {
    try {
      const existingFounder = await Founder.findByPk(req.user.toString());

      if (!existingFounder) {
        return res.status(400).json({
          errorMessage:
            "Đã phát sinh lỗi, vui lòng liên hệ Developer để phản ánh",
        });
      }

      // hash the password

      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash("123456", salt);

      // update the user in the database

      const updateUser = await existingFounder.update({
        Fdr_password: passwordHash,
      });

      //const savedUser = await existingUser.save();

      // create the JWT token

      const token = jwt.sign(
        {
          id: existingFounder.dataValues.Fdr_id,
        },
        JWT_SECRET
      ); // id from mongdb + đuôi password generator

      // tạo jsonwebtoken cho để lấy token cho user

      res.cookie("token", token, { httpOnly: true }).send();
    } catch (err) {
      res.status(500).send();
    }
  }
}

module.exports = new FounderController();
