const crypto = require('crypto');

class UserModel {
  static generateRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  static sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return hash.digest('hex');
  }

  createUser(email, password) {
    const salt = UserModel.generateRandomString(16);
    const hashedPassword = UserModel.sha512(password, salt);

    console.log('created user', email, salt, hashedPassword);

    return new Promise((resolve, reject) => {
      resolve();
    });
  }

  loginUser(email, password) {
    return new Promise((resolve, reject) => {
      resolve('some random token');
    });
  }
}

module.exports = UserModel;
