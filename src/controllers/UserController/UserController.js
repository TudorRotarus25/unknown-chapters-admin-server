const UserModel = require('../../models/UserModel/UserModel');

const createAccount = (req, res) => {
  const { email, password, confirmPassword } = req.body;

  if (
    !email
    || !password
    || !confirmPassword
  ) {
    res.status(400).json({
      error: "Some mandatory fields are missing",
    });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({
      error: "Passwords don\'t match",
    });
    return;
  }

  const userModel = new UserModel();
  userModel.createUser(email, password)
    .then(() => {
      res.json({});
    })
    .catch((error) => {
      res.status(400).json({
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
      error: "Some mandatory fields are missing",
    });
    return;
  }

  const userModel = new UserModel();
  userModel.loginUser(email, password)
    .then(({ token, refreshToken }) => {
      res.json({
        token,
        refreshToken,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      })
    });
};

const refreshToken = (req, res) => {
  const { email, refreshToken } = req.body;

  if (!email || !refreshToken) {
    res.status(400).json({
      success: false,
      error: 'Some mandatory fields are missing',
    });
    return;
  }

  const userModel = new UserModel();
  userModel.refreshToken(email, refreshToken)
    .then(({ token, refreshToken }) => {
      res.json({
        token,
        refreshToken,
      });
    })
    .catch((error) => {
      res.status(400).json({
        error,
      })
    });
};

module.exports = {
  createAccount,
  login,
  refreshToken,
};
