'use strict'

const userModel = use('App/Models/User')
const costModel = use('App/Models/CostCenter')
const officeModel = use('App/Models/Office')
const departmentModel = use('App/Models/Department')

class DatabaseSeeder {
  async run () {
    await costModel.create({ title: 'RH' })
    await departmentModel.create({ title: 'TI', cost_center_id: 1 })
    await officeModel.create({ title: 'Analista', department_id: 1 })
    await userModel.create({
      username: 'teste',
      email: 'teste@teste.com',
      password: '123456',
      department_id: 1,
      office_id: 1,
      cost_center_id: 1
    })
  }
}

module.exports = DatabaseSeeder
