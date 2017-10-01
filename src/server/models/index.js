const Sequelize = require('sequelize');

const sequelize = new Sequelize('cricket', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});

const db = {
  Sequelize,
  sequelize,
  Message: sequelize.import('./Message.js'),
};

module.exports = db;
