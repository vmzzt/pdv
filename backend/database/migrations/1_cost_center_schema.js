'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CostCenterSchema extends Schema {
  up() {
    this.create('cost_centers', (table) => {
      table
        .increments()

      table
        .string('title')
        .notNullable()
        .unique()

      table
        .timestamps()
    })
  }

  down() {
    this.drop('cost_centers')
  }
}

module.exports = CostCenterSchema
