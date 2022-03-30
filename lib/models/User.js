
const pool = require('../utils/pool');
module.exports = class User {
  id;
  firstName;
  lastName;
  email;
  password;

  constructor(row) {
    this.id = row.id;
    this.firstName = row.first_name;
    this.lastName = row.last_name;
    this.email = row.email;
    this.password = row.password_hash;
  }

  static async insert({ firstName, lastName, email, password }) {
    const { rows } = await pool.query(`
    INSERT INTO users (first_name, last_name, email, password_hash)
    VALUES ($1, $2, $3, $4)
    RETURNING *`, [firstName, lastName, email, password]);

    return new User(rows[0]);
  }
};
