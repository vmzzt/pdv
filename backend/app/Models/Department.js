'use strict'

const Model = use('Model')

class Department extends Model {

    CostCenters() {
        return this.belongsTo('App/Models/CostCenter')
    }

}

module.exports = Department
