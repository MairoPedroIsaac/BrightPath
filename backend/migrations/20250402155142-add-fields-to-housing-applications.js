module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.addColumn("HousingApplications", "fullName", {
          type: Sequelize.STRING,
          allowNull: false,
      });
      await queryInterface.addColumn("HousingApplications", "email", {
          type: Sequelize.STRING,
          allowNull: false,
      });
      await queryInterface.addColumn("HousingApplications", "phone", {
          type: Sequelize.STRING,
          allowNull: false,
      });
      await queryInterface.addColumn("HousingApplications", "reason", {
          type: Sequelize.TEXT,
          allowNull: false,
      });
  },

  down: async (queryInterface) => {
      await queryInterface.removeColumn("HousingApplications", "fullName");
      await queryInterface.removeColumn("HousingApplications", "email");
      await queryInterface.removeColumn("HousingApplications", "phone");
      await queryInterface.removeColumn("HousingApplications", "reason");
  },
};
