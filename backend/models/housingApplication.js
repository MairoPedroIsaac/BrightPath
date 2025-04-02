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
            fullName: { type: DataTypes.STRING, allowNull: false }, // New field
            email: { type: DataTypes.STRING, allowNull: false }, // New field
            phone: { type: DataTypes.STRING, allowNull: false }, // New field
            reason: { type: DataTypes.TEXT, allowNull: false }, // New field
            userId: { type: DataTypes.UUID, allowNull: true }, // Existing field
            houseId: { type: DataTypes.UUID, allowNull: true }, // Existing field
            status: { type: DataTypes.STRING, defaultValue: "pending" }, // Existing field
        },
        {
            sequelize,
            modelName: "HousingApplication",
            tableName: "HousingApplications",
        }
    );

    return HousingApplication;
};
