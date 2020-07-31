'use strict'

const Model = use('Model')

class Office extends Model {

    Departments() {
        return this.belongsTo('App/Models/Department')
    }
}

module.exports = Office
