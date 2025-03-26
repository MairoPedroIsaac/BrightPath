const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.js");

const Donation = sequelize.define("Donation", {
    userId: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
});

Donation.associate = (models) => {
    Donation.belongsTo(User, { foreignKey: "userId" });
};

module.exports = Donation;
