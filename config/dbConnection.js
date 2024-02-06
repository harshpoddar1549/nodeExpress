import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.nshatai.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`)
        console.log("Database Connected:", connect.connection.host, connect.connection.name)
    }catch(err){
        console.log(err)
        process.exit(1) // close the program synchronysly 
    }
}