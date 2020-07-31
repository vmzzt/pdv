'use strict'

const costCenterModel = use('App/Models/CostCenter')
const departmentModel = use('App/Models/Department')
const userModel = use('App/Models/User')
const officeModel = use('App/Models/Office')

class CostCenterController {
  async createCostCenter ({ request, response }) {
    const { title } = request.all()
    const CreateCostCenter = await costCenterModel.create({ title })

    return response.status(201).send(CreateCostCenter)
  }

  async listAll () {
    let costCenters = await costCenterModel.all()
    costCenters = costCenters.toJSON()
    return costCenters
  }

  async listAllCostCenter ({ response, auth }) {
    const Department = await departmentModel
      .query()
      .where('id', auth.user.department_id)
      .first()

    let costCenters = await costCenterModel
      .query()
      .where('id', Department.cost_center_id)
      .fetch()
    costCenters = costCenters.toJSON()
    costCenters = costCenters.map((cost) => {
      return {
        ...cost,
        type: 'Centro de custo'
      }
    })

    return costCenters
  }

  async deletCostCenter ({ auth, response, params }) {
    const costCenter = await costCenterModel.find(params.id)
    if (costCenter) {
      const costData = await departmentModel
        .query()
        .where('cost_center_id', costCenter.id)
        .first()
      await officeModel.query().where('department_id', costData.id).delete()
      await userModel.query().where('department_id', costData.id).delete()
      await costData.delete()
      await costCenter.delete()
      return response.status(200).send({
        message:
          'Todos os dados refetente a este centro de custo foram exluidos.'
      })
    }
    return response
      .status(400)
      .send({ message: 'departamento nao encontrado' })
  }
}

module.exports = CostCenterController
