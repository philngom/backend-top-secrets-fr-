const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = class UserService {
  static async create({ firstName, lastName, email, password }) {
    const passwordHash = await bcrypt.hash(
      password, Number(process.env.SALT_ROUNDS)
    );
    // console.log('🚀 ~ file: userService.js ~ line 10 ~ UserService ~ create ~ passwordHash', passwordHash);

    const user = await User.insert({ firstName, lastName, email, passwordHash });

    return user;
  }
};
