//console.log(process.env.DATABASE_URL);
const pgp = require("pg-promise")();
const connection = pgp(process.env.DATABASE_URL);
//const connection = pgp("postgres://bmaldonado:Kali1124!@localhost:5432/monopoly")

module.exports = connection;