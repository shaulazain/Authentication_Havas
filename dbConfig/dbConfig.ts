import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MONGODB CONNECTED SUCCESSFULLY');
        });

        connection.on('error', (err) => {
            console.error('MONGODB CONNECTION ERROR: ' + err);
            process.exit(1);
        });

    } catch (error) {
        console.error('Something went wrong');
        console.error(error);
        process.exit(1);
    }
}
