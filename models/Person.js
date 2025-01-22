const mongoose = require('mongoose');

//Define the Person schema
const personSchema = new mongoose.Schema({
   name: { //fiels hai name (column)
      type: String,
      required: true // it means it is mandatory hai true karne pe
   },
   age: {
      type: Number
   },
   work: {
    type: String,
    enum: ['chef', 'waiter', 'manager'], //yahi teen value me se hi koi ek value user input karega 
    required: true
   },
   mobile:{
      type: String,
      required: true
   },
   email:{
      type: String,
      required: true,
      unique: true // means email koi enter kare to unique hoga
   },
   address:{
      type:String
   },
   salary:{
      type: Number,
      required: true
   }
});

//ham schema se Model banate hai
//or ham usi model ko use karke jitna vi database operations hai usko perform karte hai like create karna ko , read karna ho , update karna ho persons ko ya delete karna ho
const Person = mongoose.model('Person', personSchema); // yaha pe person nam ka model bna diya
module.exports = Person;

