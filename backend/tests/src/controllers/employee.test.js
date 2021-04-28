import {describe, it} from 'mocha'

import employeeController from "../../../src/controllers/employee";
import employeeModel from "../../../src/models/employee";



describe("employee controller", function() {
    it("fetches all employees", async function() {
        const employeeModelStub = sinon.stub(employeeModel, 'allEmployeesByArrivalDate');
        employeeModelStub.resolves({response:"ok"});
        let employees = await employeeController.fetchAllEmployees();
        let a=1
    })
});
