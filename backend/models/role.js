const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Role extends Model {
        static associate(models) {
            Role.hasMany(models.User, { foreignKey: "roleId", onDelete: "CASCADE" });
        }
    }

    Role.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            sequelize,
            modelName: "Role",
        }
    );

    return Role;
};
