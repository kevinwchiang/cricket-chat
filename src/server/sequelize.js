const Sequelize = require('sequelize');

const sequelize = new Sequelize('cricket', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  }
});

// const User = sequelize.define('user', {
//   firstName: {
//     type: Sequelize.STRING
//   },
//   lastName: {
//     type: Sequelize.STRING
//   }
// });

// // force: true will drop the table if it already exists
// User.sync({ force: true }).then(() =>
//   // Table created
//   User.create({
//     firstName: 'John',
//     lastName: 'Hancock',
//   })
// );

module.exports = sequelize;
