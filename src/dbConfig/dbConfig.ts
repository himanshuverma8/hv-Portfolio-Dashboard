import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URI!);

        const connection = mongoose.connection;
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit(1);
        });

    } catch (error) {
        console.log('Something went wrong while connecting to MongoDB!');
        console.error(error);
        process.exit(1);
    }
}