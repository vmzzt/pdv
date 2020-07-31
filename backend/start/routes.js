'use strict'

const Route = use('Route')

// User
Route.post('users', 'UserController.store').middleware(['auth:jwt'])
Route.post('session', 'SessionController.store')
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')
Route.get('listAllUsers', 'UserController.listAllUsers').middleware([
  'auth:jwt'
])
Route.put('updateUser/:id', 'UserController.updateUser').middleware([
  'auth:jwt'
])
Route.delete('deletAll/:id', 'UserController.deletAll')

// Cost Center
Route.post('createCostCenter', 'CostCenterController.createCostCenter')
Route.get('listAll', 'CostCenterController.listAll')
Route.get(
  'listAllCostCenter',
  'CostCenterController.listAllCostCenter'
).middleware(['auth:jwt'])
Route.delete('deletCostCenter/:id', 'CostCenterController.deletCostCenter')

// Department
Route.post('createDepartment', 'DepartmentController.createDepartment')
Route.get(
  'getAllDepartaments',
  'DepartmentController.getAllDepartaments'
).middleware(['auth:jwt'])

Route.put('updateDepartment/:id', 'DepartmentController.updateDepartment')
Route.delete('deletDepartment/:id', 'DepartmentController.deletDepartment')

// Office
Route.post('createOffice', 'OfficeController.createOffice').middleware([
  'auth:jwt'
])

Route.get('listOffice', 'OfficeController.listOffice').middleware(['auth:jwt'])
