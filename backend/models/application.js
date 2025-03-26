const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.js");
const Housing = require("./housing.js");

const Application = sequelize.define("Application", {
    userId: DataTypes.INTEGER,
    houseId: DataTypes.INTEGER,
    status: { type: DataTypes.STRING, defaultValue: "pending" },
});

Application.associate = (models) => {
    Application.belongsTo(User, { foreignKey: "userId" });
    Application.belongsTo(Housing, { foreignKey: "houseId" });
};

module.exports = Application;
