import mongoose from 'mongoose';
import taskManagerConnection from '../db-config/mongodb-config';

const appointmentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    note: {type: String},
    appointments: {
        type: [
            {
                date: { type: String },
                time: { type: String },
                status: { type: String }
            }
        ]
    }
},
    { timestamps: true }
);

const AppointmentModel = taskManagerConnection.model('Appointments', appointmentSchema);

export default AppointmentModel;