import express, { json } from 'express'

import mongoose from 'mongoose';

// install and import dotenv module to be
// able to read from .env files
import * as dotenv from 'dotenv'
import contactRouter from './routes/contactRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { connectDB } from './config/dbConnection.js';
import userRouter from './routes/userRoutes.js';
dotenv.config()


const app = express();
const port = process.env.PORT


// whenever we want to receive some data from the client
// we need to parse the data stream in our server that is sent by the client
// in order to receive it.
// for that we need a middleware.
// we can get the one from the express
app.use(json()) // or like app.use(express.json())

// app.use are called the middlewares
// here we are adding a middle ware to our project
app.use('/api/contacts', contactRouter)

app.use('/api/users', userRouter)


// custom Error Handler to transform our messages in JSON format
app.use(errorHandler)



// connect to the DB
connectDB()
.then(() => app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})).catch((err) => {
    console.log("Error:", err)
    process.exit(1)
})

