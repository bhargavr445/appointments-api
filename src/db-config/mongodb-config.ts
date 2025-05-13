import mongoose from 'mongoose';

const taskManagerConnection = mongoose.createConnection(`mongodb+srv://${process.env.ATLAS_USER_NAME}:${process.env.ATLAS_PSWD}@${process.env.CLUSTER_INFO}/task-manager-api`);

taskManagerConnection.on('connected', () => {
    console.log('MongoDB connected to task-manager-api');
});

taskManagerConnection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

export default taskManagerConnection;