//Importing the package
const express = require('express')
const connectDatabase = require('./database/database');
const dotenv = require('dotenv')

//Creating an express application
const app = express();

//Express JSON configuratin
app.use(express.json())

// dotenv Configuration
dotenv.config()

//Connecting to database
connectDatabase()

//Defining the port
const PORT = process.env.PORT;

//Making a test endpoint
//Endpoints : POST, GET, PUT, DELETE
app.get('/test', (req,res)=>{   
    res.send("Test API is working!...")
})

// http://localhost:5000/test

//configuring Routes of User

app.use('/api/user',require('./routes/userRoutes'))
// http://localhost:5000/api/user/create


//Starting the server
app.listen(PORT, ()=>{
    console.log(`Server is Running on port ${PORT} !`)
})