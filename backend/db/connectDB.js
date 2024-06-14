import mongoose from "mongoose";

 const connectDB = async (req, res) => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected Successfully: ${conn.connection.host}`)
    } catch (error) {
        console.log(`MongoDB connection error ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;