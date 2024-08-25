const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)


const apiRouter = require('./routers/apirouter')




app.use('/api', apiRouter)
app.listen(process.env.PORT,()=>{console.log(`server is running port on ${process.env.PORT}`)})