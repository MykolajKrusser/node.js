const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const User = sequelize.defin('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;