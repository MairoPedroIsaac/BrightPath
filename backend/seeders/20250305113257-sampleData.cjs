module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: Sequelize.fn('uuid_generate_v4'),  // Correct way to generate UUID
      full_name: 'Admin User',
      email: 'admin@example.com',
      password_hash: '$2b$10$iQLL9khiszesivhT.MRdQetHZFbw3QzWbADo0ywKnqVOFm9txLvFG',  // Example hash
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
