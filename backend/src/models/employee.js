import pool from './db.js';

class employeeModel {
    static allEmployeesByArrivalDate = async function () {
        try {
            const results = await pool.query(
              'SELECT * FROM employees ORDER BY arrivalDate DESC'
            );
            return results.rows;
        }
        catch(e){
            return [];
        }
    };

    static createEmployee = async function (employeeDetails){

        try {
            await pool.query(`INSERT INTO employees (email, name, HS, arrivalDate) VALUES ($1, $2, $3, $4)`,
                [
                    employeeDetails.email,
                    employeeDetails.name,
                    employeeDetails.HS,
                    employeeDetails.arrivalDate
                ]
            );
            return true
        }
        catch(e){
            console.log(e);
            return false;
        }
    };

    static updateEmployee = async function (employeeDetails) {


        try {
            await pool.query(
              `UPDATE employees SET hs=true WHERE email=$1 and arrivalDate=$2`,
              [
                  employeeDetails.email,
                  employeeDetails.arrivalDate
              ]
            );
            const results = await pool.query(
              'SELECT * FROM employees WHERE email=$1',
              [
                  employeeDetails.email
              ]
            );
            console.log("data", results.rows);

            return true
        }
        catch(e){
            console.log(e);
            return false;
        }
    }
}


export default employeeModel;
