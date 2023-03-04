const {
  signupService,
  loginService,
  getSessionService,
  logoutService,
} = require("../services/user.service");
const signupController = async (req, res, next) => {
  const result = await signupService(req, res, next);
  res.send(result);
};
const loginController = async (req, res, next) => {
  const result = await loginService(req, res, next);
  if (!result) res.send("invalid credentials");
  else {
    const data = {
      token: result.token,
      user: result.user,
      message: "login successful",
      status: true,
    };
    res.status(200).send(data);
  }
};

const getSessionController = async (req, res, next) => {
  console.log("executing getSessionController");
  console.log("decoded in headers", req.headers.user);
  const sessions = await getSessionService(req, res, next);
  const data = {
    token: req.headers.user.decoded.token,
    data: sessions,
    message: "got data",
    status: true,
  };
  res.status(200).send(data);
};

const logoutController = async (req, res, next) => {
  await logoutService(req, res, next);
  res
    .status(205)
    .send({ token: null, message: "logout seccessful", success: true });
};

module.exports = {
  signupController,
  loginController,
  getSessionController,
  logoutController,
};
