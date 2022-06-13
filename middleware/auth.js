const jwt = require("jsonwebtoken");
function auth(req, res, next) {
  try {
    const token = req.params.token;
    if (!token)
      return res
        .status(404)
        .json({ errorMessage: "Tài khoản người dùng không xác thực" });

    const validatedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = validatedUser.id;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ errorMessage: "Tài khoản người dùng không xác thực" });
  }
}
module.exports = auth;
