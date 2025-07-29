import mongoose from 'mongoose';
import taskManagerConnection from '../db-config/mongodb-config';

const appointmentSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    note: { type: String },
    appliances: {
        type: {
            numberOfLargeAppliances: { type: Number }
        }
    },
    boxes: {
        type: {
            fragile: { type: Number },
            noOfBoxes: { type: String }
        }
    },
    specialItems: {
        type: {
            largeOrHeavyItems: { type: Number }
        }
    },
    currentAddress: { type: String },
    newAddress: { type: String },
    electronics: {
        type: {
            numberOfMonitorsAndComputers: { type: Number },
            numberOfTvs: { type: Number },
            otherElectronics: { type: String },
        }
    },
    furniture: {
        type: {
            numberOfFurniturePieces: { type: Number },
            listOfLargeItems: { type: String },
        }
    },
    movingFrom: {
        type: {
            floorNumber: { type: Number },
            apartmentType: { type: String },
            elevator: { type: Boolean }
        }
    },
    movingTo: {
        type: {
            floorNumber: { type: Number },
            apartmentType: { type: String },
            elevator: { type: Boolean }
        }
    },

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