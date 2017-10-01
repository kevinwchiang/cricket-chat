module.exports = function (sequelize, DataTypes) {
  return sequelize.define('message', {
    text: DataTypes.TEXT,
  }, { timestamps: true });
};
