const express = require('express')
const app = express()

const dotenv = require('dotenv')
dotenv.config({path:'./.env'})
const web = require('./routes/web')
const connectDb = require('./db/connectDb')
const fileUpload = require("express-fileupload")
const cors = require('cors')

app.use(cors()) //for api communication in react

//temp file uploader
app.use(fileUpload({useTempFiles:true}))


connectDb()

//for dbase in API
app.use(express.json())

//load route
app.use('/api',web)
//localhost: 1234/api






//Server creation
app.listen(process.env.PORT,()=>{
    console.log(`server is running on localhost :${process.env.PORT} `)
})