const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL= 'mongodb://localhost:27017/hotels'

//set up MongoDB connection
mongoose.connect(mongoURL,{
   useNewUrlParser: true,
   useUnifiedTopology: true
})

//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
//db is like a brige jo nodejs and mongoose ke beech connection banata hai
const db = mongoose.connection;

//Define event Linstners for databse connection
db.on('connected' ,() => {
   console.log('Connected to MongoDB server');
})

db.on('error', (err) => {
   console.error('MongoDB connection error:' , err);
})

db.on('disconnected', ()=> {
   console.log('MongoDB disconnected');
})

module.exports = db;