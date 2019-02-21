const express = require('express');
const router = express.Router();

const {
  createAccount,
  login,
  refreshToken,
} = require('../../controllers/UserController/UserController');

router.post('/createAccount', createAccount);
router.post('/login', login);
router.post('/token', refreshToken);

module.exports = router;
