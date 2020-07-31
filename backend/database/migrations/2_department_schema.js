'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DepartmentSchema extends Schema {
  up() {
    this.create('departments', (table) => {
      table
        .increments()

      table
        .string('title', 80)
        // .notNullable()
        .unique()

      table
        .integer('cost_center_id')
        .unsigned()
        .references('id')
        .inTable('cost_centers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .timestamps()
    })
  }

  down() {
    this.drop('departments')
  }
}

module.exports = DepartmentSchema
