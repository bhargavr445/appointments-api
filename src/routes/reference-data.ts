import express, { Request, Response } from 'express';
import MovingTypeModel from '../mongo-models/moving-type-model';
const router = express.Router();

router.get('/api/movingtype', async (request: Request, response: Response) => {
    try {
        const movingTypeList = await MovingTypeModel.find();
        return response.status(200).send({ data: movingTypeList, status: 1 });
    } catch (error) {
        return response.status(500).send({ data: error, status: 0 });
    }
});

router.post('/api/movingtype', async (request: Request, response: Response) => {
    const payload = request.body;
    try {
        const insertResponse = await MovingTypeModel.insertOne(payload);
        return response.status(200).send({ data: insertResponse, status: 1 });
    } catch (error) {
        return response.status(500).send({ data: error, status: 0 });
    }
});

export default router;