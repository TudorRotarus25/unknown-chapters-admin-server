const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const randtoken = require('rand-token');

const {
  TOKEN_TTL,
} = require('../../constants');

const SECRET = 'SOME_SECRET';

class UserModel {
  static generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  static hashPassword(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
  }

  createUser(email, password) {
    const salt = UserModel.generateRandomString(16);
    const hashedPassword = UserModel.hashPassword(password, salt);

    console.log('created user', email, salt, hashedPassword);

    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  loginUser(email, password) {
    return new Promise((resolve, reject) => {
      const salt = '';
      const hashedPassword = UserModel.hashPassword(password, salt);
      console.log('Logged in with', hashedPassword);

      const userData = {
        email,
        name: '',
        role: '',
      };

      const token = jwt.sign(userData, SECRET, { expiresIn: TOKEN_TTL });
      const refreshToken = randtoken.uid(256);

      const response = {
        token,
        refreshToken,
      };

      resolve(response);
    });
  }

  refreshToken(email, refreshToken) {
    return new Promise((resolve, reject) => {
      if (refreshToken) { // check the refresh token
        const userData = {
          email,
          name: '',
          role: '',
        };

        const token = jwt.sign(userData, SECRET, { expiresIn: TOKEN_TTL });
        const refreshToken = randtoken.uid(256);

        const response = {
          token,
          refreshToken,
        };

        resolve(response);
      }
    });
  }
}

module.exports = UserModel;
