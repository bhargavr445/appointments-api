import mongoose from 'mongoose';
import taskManagerConnection from '../db-config/mongodb-config';

const referenceData = {
    code: { type: String },
    description: { type: String },
    order: { type: Number }
}

const movingTypeSchema = new mongoose.Schema(referenceData, { timestamps: true });
const MovingTypeModel = taskManagerConnection.model('movingtypes', movingTypeSchema);
export default MovingTypeModel;
    