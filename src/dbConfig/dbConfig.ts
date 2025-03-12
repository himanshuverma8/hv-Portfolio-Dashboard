import mongoose from 'mongoose';

export async function connect() {
    try {
        console.log(process.env.MONGO_URI!)
        await mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('✅ MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
            process.exit(1);
        });

    } catch (error) {
        console.error('❌ Something went wrong while connecting to MongoDB:', error);
    }
}
