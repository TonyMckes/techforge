"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const tags = ["implementation", "frontend", "backend"].map((name) => ({
      name,
    }));

    await queryInterface.bulkInsert("Tags", tags, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tags", null, {});
  },
};
