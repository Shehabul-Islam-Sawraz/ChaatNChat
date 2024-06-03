'use strict';

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Shehabul Islam',
        lastName: 'Sawraz',
        email: 's@gmail.com',
        password: bcrypt.hashSync('admin', 10),
        gender: 'male'
      },
      {
        firstName: 'Abrar',
        lastName: 'nafee',
        email: 'a@gmail.com',
        password: bcrypt.hashSync('admin', 10),
        gender: 'male'
      },
      {
        firstName: 'Mobaswirul',
        lastName: 'Islam',
        email: 'm@gmail.com',
        password: bcrypt.hashSync('admin', 10),
        gender: 'male'
      },

    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
