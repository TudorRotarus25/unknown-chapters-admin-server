const UserModel = require('../../models/UserModel/UserModel');

const createAccount = (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (
    !email
    || !password
    || !confirmPassword
  ) {
    res.status(400).json({
      success: false,
      error: "Some mandatory fields are missing",
    });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({
      success: false,
      error: "Passwords don\'t match",
    });
    return;
  }

  const userModel = new UserModel();
  userModel.createUser(email, password)
    .then(() => {
      res.json({
        success: true,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        error,
      });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (
    !email
    || !password
  ) {
    res.status(400).json({
      success: false,
      error: "Some mandatory fields are missing",
    });
    return;
  }

  const userModel = new UserModel();
  userModel.loginUser(email, password)
    .then((token) => {
      res.json({
        success: true,
        token,
      });
    })
    .catch((error) => {
      res.status(400).json({
        success: false,
        error,
      })
    });
};

module.exports = {
  createAccount,
  login,
};
