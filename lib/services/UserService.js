const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = class UserService {
  static async create({ firstName, lastName, email, password }) {
    const passwordHash = await bcrypt.hash(
      password, Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({ firstName, lastName, email, passwordHash });

    return user;
  }
};
