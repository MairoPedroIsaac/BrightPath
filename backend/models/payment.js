const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Payment extends Model {
        static associate(models) {
            Payment.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
        }
    }

    Payment.init(
        {
            userId: { type: DataTypes.UUID, allowNull: false }, // Changed from INTEGER to UUID
            amount: { type: DataTypes.FLOAT, allowNull: false },
            transactionId: { type: DataTypes.STRING, allowNull: false, unique: true },
            status: { type: DataTypes.STRING, defaultValue: "pending" },
        },
        {
            sequelize,
            modelName: "Payment",
        }
    );

    return Payment;
};
