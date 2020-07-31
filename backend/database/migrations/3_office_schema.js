'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OfficeSchema extends Schema {
  up() {
    this.create('offices', (table) => {
      table
        .increments()

      table
        .string('title')
        .notNullable()
        // .unique()

      table
        .integer('department_id')
        .unsigned()
        .references('id')
        .inTable('departments')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table
        .timestamps()
    })
  }

  down() {
    this.drop('offices')
  }
}

module.exports = OfficeSchema
