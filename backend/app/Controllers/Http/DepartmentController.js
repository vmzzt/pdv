'use strict'

const departmentModel = use('App/Models/Department')
const officeModel = use('App/Models/Office')
const userModel = use('App/Models/User')

class DepartmentController {
  async getAllDepartaments ({ auth }) {
    let department = await departmentModel
      .query()
      .where('cost_center_id', auth.user.cost_center_id)
      .fetch()
    department = department.toJSON()

    department = department.map((dep) => {
      return {
        ...dep,
        type: 'Departamento'
      }
    })
    return department
  }

  async createDepartment ({ request, response, view }) {
    const { title, CostCenter } = request.all()
    const CreatedDepartment = await departmentModel.create({
      title,
      cost_center_id: CostCenter
    })

    return response.status(201).send(CreatedDepartment)
  }

  async updateDepartment ({ request, auth, params }) {
    const data = request.all()

    const depart = await departmentModel.query().where('id', params.id).first()
    depart.merge(data)
    await depart.save()

    return depart
  }

  async deletDepartment ({ auth, response, params }) {
    const department = await departmentModel.find(params.id)
    if (department) {
      await officeModel.query().where('department_id', department.id).delete()
      await userModel.query().where('department_id', department.id).delete()

      await department.delete()
      return response.status(200).send({
        message:
          'Todos os usuarios e cargos refetente a este departamento foram exluidos.'
      })
    }
    return response
      .status(400)
      .send({ message: 'departamento nao encontrado' })
  }
}

module.exports = DepartmentController
