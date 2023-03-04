const SessionModel = require("../models/session.model");
const userModel = require("../models/user.model");
const { signJwt } = require("../utils/jwt.utils");

const signupService = async (req, res, next) => {
  return await userModel.create(req.body);
};
const loginService = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await userModel.findOne({ email });
  if (!user) return false;
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) return false;
  const session = await SessionModel.create({ user: user._id });

  //create token
  const token = signJwt({
    userId: user._id,
    email: user.email,
    session: session._id,
  });
  if (token) return { token, user: user.email };
  else return false;
};
const getSessionService = async (req, res, next) => {
  const userId = req.headers.user.userId;
  const sessions = await SessionModel.find({ user: userId, valid: true });
  return sessions;
};
const logoutService = async (req, res, next) => {
  const user = req.headers.user.userId;
  const result = await SessionModel.updateMany({user}, {valid:false})
  return result

};

module.exports = {
  signupService,
  loginService,
  getSessionService,
  logoutService,
};
