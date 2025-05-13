import mongoose from 'mongoose';

const taskManagerConnection = mongoose.createConnection('mongodb://127.0.0.1:27017/task-manager-api');

taskManagerConnection.on('connected', () => {
    console.log('MongoDB connected to task-manager-api');
});

taskManagerConnection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

export default taskManagerConnection;