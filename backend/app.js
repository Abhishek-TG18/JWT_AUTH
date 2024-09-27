const express = require('express');
require('dotenv').config();
const userRoute= require('./router/authrouter')
const databaseConnect = require('./config/db');
const app =  express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const corsOptions = {
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500'], 
    credentials: true, 
};

app.use(cors(corsOptions));

databaseConnect();  
app.use(express.json())

app.use('/',userRoute);
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

module.exports=app;