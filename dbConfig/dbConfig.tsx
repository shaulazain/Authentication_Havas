import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.Connection; 
    } catch (error) {
        console.log('something gone wrong')
        console.log(error)
    }
}