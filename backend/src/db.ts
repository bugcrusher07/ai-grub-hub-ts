import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI_FIRST}${process.env.ENCODED_MONGO_PASSWORD}${process.env.MONGO_URI_SECOND}` as string);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error:any) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    if (error instanceof Error) {
      console.error('Error Name:', error.name);
      console.error('Error Message:', error.message);
      console.error('Error Stack:', error.stack);
    }
    process.exit(1)
  }
};