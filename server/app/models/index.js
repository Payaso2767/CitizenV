const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  timezone: '+07:00'
});

account = require("./account.model")(sequelize, DataTypes)
info = require("./population.model")(sequelize, DataTypes)
const db = {
  account,
  info,
};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
module.exports = db;