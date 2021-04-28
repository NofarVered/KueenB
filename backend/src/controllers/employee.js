import employeeModel from "../models/employee.js";

class employeeController{
  static fetchAllEmployees = async function () {
    return await employeeModel.allEmployeesByArrivalDate()
  };

  static registerEmployee = async function (req, res) {
    let result = {};
    let employeeDetails = {
      email: req.body.email,
      name: req.body.name,
      HS: req.body.HS,
      arrivalDate: req.body.arrivalDate
    };

    try{
      console.log('Attempting to create employee: '.concat(employeeDetails.email));
      result.success = await employeeModel.createEmployee(employeeDetails);
      console.log('Employee: '.concat(employeeDetails.email, ' registered successfully'));
    }
    catch(e){
      console.error(e);
      result.success=false;
    }
    return result
  };

  static updateHealthStatement = async function (req, res) {
    let result = {};

    let employeeDetails = {
      email: req.body.email,
      name: req.body.name,
      HS: req.body.HS,
      arrivalDate: req.body.arrivalDate
    };

    try{
      console.log('Attempting update employee: {0}]\'s HS for date: {1}'.format(
          employeeDetails.email,
          employeeDetails.arrivalDate
      ));
      result.success = await employeeModel.updateEmployee(employeeDetails)
    }

    catch(e){
      result.success=false;
    }
    return result
  }

}

export default employeeController;
