import express, { Request, Response } from 'express';
const router = express.Router();
import AppointmentModel from '../mongo-models/appointments-model';

router.get('/api/schedule', async (_: Request, response: Response) => {
    try {
        const appointments = await AppointmentModel.find({});
        return response.status(200).send({ data: appointments, status: 1 });

    } catch (error) {
        return response.status(500).send({ data: error, status: 0 });
    }
});

/**
 * Based on the requested date, this API will query all the appointments for the day.
 */
router.get('/api/checkIfAppointIsAlreadySchedudForToday', async (request: Request, response: Response) => {
    const requestedDate = request.query.date;
    if (!requestedDate) {
        return response.status(500).send({ data: 'Date is Required to see the engagements', status: 0 });
    }
    try {
        const appointmentsListForRequestedDate = await AppointmentModel.aggregate(
            [
                {
                    $match: {
                        appointmentDate: requestedDate
                    }
                },
                {
                    $project: {
                        _id: 0,
                        appointmentTime: 1
                    }
                }
            ]

        );
        
        
        // await AppointmentModel.aggregate(
        // [
        //     { $unwind: "$appointments" },
        //     {
        //       $match: {
        //         "appointments.date": requestedDate
        //       }
        //     },
        //     {
        //       $project: {
        //         _id: 0,
        //         time: "$appointments.time",
        //         status: "$appointments.status"
        //       }
        //     }
        //   ])        
          
          
        return response.status(200).send({ data: appointmentsListForRequestedDate ? appointmentsListForRequestedDate : [], status: 1 });
    } catch (error) {
        return response.status(500).send({ data: error, status: 0 });
    }
});

router.get('/api/appointmentsByDate', (request: Request, response: Response) => {

})

router.post('/api/schedule', async (request: Request, response: Response) => {

    try {
        //const appointment = [{ ...request.body.appointment, status: 'confirmed' }];
        // delete request.body.appointment;
        //const updatedPayload = { ...request.body, appointments: appointment };
        //const date = updatedPayload.appointments[0].date;
        // const existing = await AppointmentModel.findOne({
        //     email: updatedPayload.email,
        //     "appointments.date": date
        //   });

        //   if (existing) {
        //     return response.status(409).send({
        //       status: 0,
        //       message: `An appointment already exists on ${date} for this user.`,
        //     });
        //   }

        const updatedResponse = {
            ...request.body, 
            appointmentDate: request.body.appointment.date, 
            appointmentTime: request.body.appointment.time, 
            status: 'confirmed'
        }

          const record = await AppointmentModel.insertOne(updatedResponse);

        /**
         * Based on the emial id, this will check if this email already exists.
         * If exists it will push new appointment to the existing appointments array
         * if not this will create new record.
         */
        // const record = await AppointmentModel.updateOne(
        //     { email: updatedPayload.email },
        //     {
        //         $set: {
        //             firstName: updatedPayload.firstName,
        //             lastName: updatedPayload.lastName,
        //             phoneNumber: updatedPayload.phoneNumber
        //         },
        //         $push: {
        //             appointments: updatedPayload.appointments
        //         }
        //     },
        //     { upsert: true }
        // );
        return response.status(200).send({ data: record, status: 1 });
    } catch (error) {
        return response.status(500).send({ data: error, status: 0 });
    }
});

router.get('/api/searchByEmail', async (request: Request, response: Response) => {
    const email = request.query.email;
    try {
        const recordForEmail = await AppointmentModel.findOne({ email: email });
        return response.status(200).send({ data: recordForEmail, status: 1 });
    } catch (error) {
        return response.status(500).send({ data: error, status: 0 });
    }
});



export default router;