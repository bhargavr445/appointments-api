import express from 'express';
import appointmentRoute from './routes/appointments';
import adminRoute from './routes/admin';
import referenceDataRoute from './routes/reference-data';
const cors = require('cors');


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(appointmentRoute);
app.use(adminRoute);
app.use(referenceDataRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
