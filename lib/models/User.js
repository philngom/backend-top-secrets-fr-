module.exports = class Player {
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
    this.password = row.password;
  }
}