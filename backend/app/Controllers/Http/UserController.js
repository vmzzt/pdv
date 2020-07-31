'use strict'

const User = use('App/Models/User')
const officeModel = use('App/Models/Office')
const randomString = require('random-string')

class UserController {
  async store ({ request, auth }) {
    const { username, email, office } = request.all()
    const PasswordRandom = randomString({ length: 30 })

    const user = await User.create({
      username,
      email,
      password: PasswordRandom,
      department_id: auth.user.department_id,
      office_id: office
    })

    return user
  }

  async listAllUsers ({ response, auth }) {
    const departmentList = await User.query()
      .where('department_id', auth.user.department_id)
      .fetch()
    return departmentList
  }

  async updateUser ({ request, auth, response, params }) {
    const data = request.all()
    const user = await User.query().where('id', params.id).first()
    if (data.department_id) {
      const officeTitle = await officeModel
        .query()
        .where('id', user.office_id)
        .first()
      let offices = await officeModel
        .query()
        .where('department_id', data.department_id)
        .fetch()
      if (offices) {
        offices = offices.toJSON()
        const filteredOffice = offices.filter(
          (office) => office.title === officeTitle.title
        )
        if (filteredOffice.length) {
          user.merge({
            office_id: filteredOffice[0].id
          })
        } else {
          const officeCreated = await officeModel.create({
            title: officeTitle.title,
            department_id: data.department_id
          })
          user.merge({
            office_id: officeCreated.id
          })
        }
      } else {
        return response.status(400).send({
          error: 'Departamento nao encontrado'
        })
      }
    }
    user.merge(data)
    await user.save()
    return user
  }

  async deletAll ({ auth, response, params }) {
    const user = await User.find(params.id)
    user.delete()
    return response.status(200).send({ message: 'Usuario deletado' })
  }
}
module.exports = UserController
