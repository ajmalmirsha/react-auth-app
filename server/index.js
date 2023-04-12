const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoutes = require('./Routes/AuthRoutes')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
  }));


app.listen(4000,()=>{
    console.log('server started');
})



mongoose.connect('mongodb://127.0.0.1:27017/react',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('DB conected successfully');
}).catch((error)=>{
    console.log(error.message);
})

app.use(cors({
    origin:['http://localhost:3000'],
    method: ['GET','POST','DELETE'],
    credentials:true
}))


app.use(cookieParser())

app.use(express.json())

app.use('/',authRoutes)