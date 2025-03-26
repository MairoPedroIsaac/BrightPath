const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Application = require("./application.js");

const Housing = sequelize.define("Housing", {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    capacity: DataTypes.INTEGER,
    available: { type: DataTypes.BOOLEAN, defaultValue: true },
});

Housing.associate = (models) => {
    Housing.hasMany(Application, { foreignKey: "houseId" });
};

module.exports = Housing;
