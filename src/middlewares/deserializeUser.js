const { verifyJwt } = require("../utils/jwt.utils");

const deserializeUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) res.send("forbidden");
    const decoded = await verifyJwt(token);
    if (!decoded) res.send("kindly login ");
    else {
      decoded.token = token;
      req.headers.user = decoded;
      next();
    }
  } catch (error) {}
};

module.exports = deserializeUser;
