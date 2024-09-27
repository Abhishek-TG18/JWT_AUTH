const express = require('express');
require('dotenv').config();
const {userRoute}= require('./router/authrouter')
const databaseConnect = require('./config/db');
const app =  express();
  
databaseConnect();  
app.use(express.json())

app.use('/',userRoute);
app.use('*', (req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});

module.exports=app;