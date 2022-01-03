const express=require('express')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const mongoose = require('mongoose')

const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')

require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

if(process.env.NODE_ENV === 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}

app.use('/api', blogRoutes)
app.use('/api', authRoutes)

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('DB Connected');
}).catch((error)=>{
    console.error('DB Connection Error ', error);
});

const port = process.env.PORT

app.listen(port, ()=>{
    console.log('server started')
})