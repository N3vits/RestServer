import mongoose from 'mongoose'


export const dbConnection = async()=> {
    try {
        await mongoose.connect(process.env.MONGODB_CNN);
        console.log('database online');
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
    
}