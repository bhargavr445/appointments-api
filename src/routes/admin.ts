import express, { Request, Response } from 'express';
const router = express.Router();
import AppointmentModel from '../mongo-models/appointments-model';
// import sendWelcomeEmail from '../email/email';
import EmployeeModel from '../mongo-models/employee-model';

router.put('/api/updateStatus', async (request: Request, response: Response) => {
    const { _id, status } = request.body;
    try {
        await AppointmentModel.updateOne({ _id }, { $set: { status } })
        return response.status(200).send({ data: `Status Updated to ${status} sucessfully`, status: 1 });
    } catch (error) {
        return response.status(500).send({ data: error, status: 0 });
    }
});

router.get('/api/allappointments', async (_: Request, response: Response) => {
    try {
        const appointments = await AppointmentModel.find({});
        return response.status(200).send({ data: appointments, status: 1 });

    } catch (error) {
        return response.status(500).send({ data: error, status: 0 });
    }
});

// router.get('/api/sendEmail', async (request: Request, response: Response) => {
//     try {
//         await sendWelcomeEmail();
//         return response.status(200).send({ data: 'Email Successfully sent.', status: 1 });
//     } catch (error) {
//         return response.status(500).send({ data: error, status: 0 });
//     }
// })

router.post('/api/fetchEmployeeByPin', async (request: Request, response: Response) => {
    const { pin } = request.body;
    try {
        const employee = await EmployeeModel.findOne({ pin })
        return response.status(200).send({ data: employee, status: 1 });
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
        const appointmentsForDate = await AppointmentModel.find({ appointmentDate: date });
        return response.status(200).send({ data: appointmentsForDate, status: 1 });
    } catch (error) {
        return response.status(500).send({ data: error, status: 0 });
    }
});

export default router;