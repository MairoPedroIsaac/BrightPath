const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.js");

const Role = sequelize.define("Role", {
    name: DataTypes.STRING,
});

Role.associate = (models) => {
    Role.hasMany(User, { foreignKey: "roleId" });
};

module.exports = Role;
