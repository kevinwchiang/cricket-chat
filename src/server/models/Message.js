const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

const Message = sequelize.define('message', {
  text: {
    type: Sequelize.STRING,
  },
}, { timestamps: true });

module.exports = Message;