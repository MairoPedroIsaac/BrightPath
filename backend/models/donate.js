const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Donate extends Model {
        static associate(models) {
            Donate.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
        }
    }

    Donate.init(
        {
            userId: { type: DataTypes.UUID, allowNull: false },
            amount: { type: DataTypes.FLOAT, allowNull: false },
            message: { type: DataTypes.STRING, allowNull: true },
            createdAt: { type: DataTypes.DATE, allowNull: false },
            updatedAt: { type: DataTypes.DATE, allowNull: false },
        },
        {
            sequelize,
            modelName: "Donate",
            tableName: "Donate",
        }
    );

    return Donate;
};
