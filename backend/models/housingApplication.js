const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class HousingApplication extends Model {
        static associate(models) {
            HousingApplication.belongsTo(models.Housing, { foreignKey: "houseId", onDelete: "CASCADE" });
            HousingApplication.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE" });
        }
    }

    HousingApplication.init(
        {
            userId: { type: DataTypes.UUID, allowNull: false },
            houseId: { type: DataTypes.UUID, allowNull: false }, // Updated to match Housing model
            status: { type: DataTypes.STRING, defaultValue: "pending" },
        },
        {
            sequelize,
            modelName: "HousingApplication",
            tableName: "HousingApplications",
        }
    );

    return HousingApplication;
};
