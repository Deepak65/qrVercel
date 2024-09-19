const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  });

const ScanLog = sequelize.define('ScanLog', {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
    tableName: 'logs',
  timestamps: false,
});

module.exports = ScanLog;

 