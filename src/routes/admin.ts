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

router.get('/api/searchAppointmentsByDate', async (request: Request, response: Response) => {
    const date = request.query.date;
    try {
        // const appointmentsForDate = await AppointmentModel.aggregate([
        //     {
        //         $unwind: {
        //             path: "$appointments"
        //         }
        //     },
        //     {
        //         $match: {
        //             "appointments.date": date
        //         }
        //     }
        // ])
        const appointmentsForDate = await AppointmentModel.findOne({ appointmentDate: date});
        return response.status(200).send({ data: appointmentsForDate, status: 1 });
    } catch (error) {
        return response.status(500).send({ data: error, status: 0 });
    }
});

export default router;