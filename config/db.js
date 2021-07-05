require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = () =>{
    mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser :true, useCreateIndex:true,useUnifiedTopology:true, useFindAndModify : true});
    const connection = mongoose.connection;

    connection.once('open', () =>{
        console.log('Database connection');
    }).catch(err =>{
        console.log('connection failed');
    })
}
module.exports = connectDB;