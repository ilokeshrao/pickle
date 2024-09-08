const express = require('express')
const cors = require('cors');

const app = express()
app.use(express.json())
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
app.use(cors({
    origin: 'http://localhost:3000', // Replace this with the origin of your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // If you need to handle cookies or other credentials
}));



const apiRouter = require('./routers/apirouter')




app.use('/api', apiRouter)
app.listen(process.env.PORT,()=>{console.log(`server is running port on ${process.env.PORT}`)})