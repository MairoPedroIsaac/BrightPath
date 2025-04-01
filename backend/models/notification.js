const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Notification extends Model {
        static associate(models) {
            Notification.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
        }
    }

    Notification.init(
        {
            userId: { type: DataTypes.UUID, allowNull: false }, // Updated from INTEGER to UUID
            message: { type: DataTypes.STRING, allowNull: false },
            isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
        },
        {
            sequelize,
            modelName: "Notification",
        }
    );

    return Notification;
};
