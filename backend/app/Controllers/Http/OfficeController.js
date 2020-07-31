'use strict'

const officeModel = use('App/Models/Office')
const departmentModel = use('App/Models/Department')

class OfficeController {
  async createOffice ({ request, response, auth }) {
    const { title } = request.all()
    const CreatedOffice = await officeModel.create({
      title,
      department_id: auth.user.department_id
    })

    return response.status(201).send(CreatedOffice)
  }

  async listOffice ({ auth }) {
    const Department = await departmentModel
      .query()
      .where('id', auth.user.department_id)
      .first()

    let offices = await officeModel
      .query()
      .where('department_id', Department.id)
      .fetch()

    offices = offices.toJSON()
    offices = offices.map((office) => {
      return {
        ...office,
        type: 'Cargo'
      }
    })
    return offices
  }

  async deletAll ({ auth, response }) {}
}

module.exports = OfficeController
