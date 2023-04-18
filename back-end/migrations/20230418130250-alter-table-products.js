'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('products', {
      fields: ['supplier_id'],    // Campo(s) da tabela de origem
      type: 'foreign key',
      // nome da chave estrangeira (dever ser único no BD)
      name: 'products_suppliers_fk',  
      references: {
        table: 'suppliers',      // Tabela estrangeira
        field: 'id'              // Campo da tabela estrangeira
      },
      onDelete: 'RESTRICT',    // Não deixa apagar uma customer em uso no customer_tags
      onUpdate: 'CASCADE'      // Atualiza customer_id em customer_tags se id em customers mudar
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('products', 'products_suppliers_fk')
    
  }
};
