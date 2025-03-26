const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Role = require("./role.js");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: "Roles", // Ensure this matches your actual table name
            key: "id",
        },
    },
});

// Define relationship
User.belongsTo(Role, { foreignKey: "roleId" });

module.exports = User;
