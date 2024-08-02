const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
});

const Value = sequelize.define('Value', {
  key: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'qr_codes',
  timestamps: false,
});

sequelize.sync();

module.exports = Value;