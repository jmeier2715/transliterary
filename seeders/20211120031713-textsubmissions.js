'use strict';

module.exports = {
     up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('textSubmissions', [{
        title: '',
        content:''
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('textSubmissions', null, {});
  }
};
