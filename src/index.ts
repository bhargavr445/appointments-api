import express from 'express';
import appointmentRoute from './routes/appointments';
const cors = require('cors');


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(appointmentRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
