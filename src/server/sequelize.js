const Sequelize = require("sequelize");

const sequelize = new Sequelize('cricket', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});

// force: true will drop the table if it already exists
User.sync({force: true}).then(() => {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

const Message = sequelize.define('message', {
  text: {
    type: Sequelize.STRING
  }
}, { timestamps: true });

Message.sync();

module.exports = { sequelize, Message };
