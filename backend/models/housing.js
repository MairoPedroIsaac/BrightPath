const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    class Housing extends Model {
        static associate(models) {
            Housing.hasMany(models.HousingApplication, { foreignKey: "houseId", onDelete: "CASCADE" });
        }
    }

    Housing.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: { type: DataTypes.STRING, allowNull: false },
            location: { type: DataTypes.STRING, allowNull: false },
            capacity: { type: DataTypes.INTEGER, allowNull: false },
            available: { type: DataTypes.BOOLEAN, defaultValue: true },
        },
        {
            sequelize,
            modelName: "Housing",
        }
    );

    return Housing;
};
