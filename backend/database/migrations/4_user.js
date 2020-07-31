'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()

      table.string('username', 80).notNullable().unique()

      table.string('email', 254).notNullable().unique()

      table.string('password', 60).notNullable()

      table
        .integer('department_id')
        .unsigned()
        .references('id')
        .inTable('departments')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table
        .integer('cost_center_id')
        .unsigned()
        .references('id')
        .inTable('cost_centers')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table
        .integer('office_id')
        .unsigned()
        .references('id')
        .inTable('offices')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.string('token')

      table.timestamp('token_created_at')

      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
