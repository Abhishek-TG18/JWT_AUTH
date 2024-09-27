const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

const databaseConnect=()=>{
    mongoose
            .connect(MONGODB_URL)
            .then((con)=>{
                console.log(`MongoDB connected with serverr ${con.connection.host}`);
            })
            .catch((err)=>{
                console.log("Error while connecting ",err.message);
            })
}

module.exports=databaseConnect;
