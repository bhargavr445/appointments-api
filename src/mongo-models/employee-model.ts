import mongoose from 'mongoose';
import taskManagerConnection from '../db-config/mongodb-config';

const employeeSchema = new mongoose.Schema({

    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    pin: { type: String }

});

const EmployeeModel = taskManagerConnection.model('Employee', employeeSchema);

export default EmployeeModel;
