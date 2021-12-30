const express=require('express')
const morgan=require('morgan')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')

const blogRoutes = require('./routes/blog')

require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

if(process.env.NODE_ENV === 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}

app.use('/api', blogRoutes)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log('server started')
})