import express, { Request, Response } from 'express';
const router = express.Router();
import AppointmentModel from '../mongo-models/appointments-model';

router.get('/api/allappointments', async (_: Request, response: Response) => {
    try {
        const appointments = await AppointmentModel.find({});
        return response.status(200).send({ data: appointments, status: 1 });

    } catch (error) {
        return response.status(500).send({ data: error, status: 0 });
    }
});