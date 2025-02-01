const mongoose = require('mongoose');
const bcrypt =  require('bcrypt');
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
   },
   username: {
      type: String,
      required: true
      
   },
   password: {
      type: String,
      required: true
      
   }
});

personSchema.pre('save', async function(next){ 
   const person = this;

   //Hash the password only if it has been modified(or is new)
   if(!person.isModified('password')) return next(); 

   try{
      //salt generation
      const salt = await bcrypt.genSalt(10);

      //hash password of original and hide salt in this hash password
      const hashedPassword = await bcrypt.hash(person.password, salt);

      //Override the plain password with hashed one
      person.password = hashedPassword;
     
      next(); //callback funtion given by mongoose ,ye batata hai save karne se pahle ka process ho chuka hai ab tum db me save kar do
   }catch(err){
     return next(err);
   }
  
})

personSchema.methods.comparePassword = async function(candidatePassword){
   try{
      //use bcrypt to compare the provided password with the hashed password
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
   }catch(err){
      throw err;
   }
}


//ham schema se Model banate hai
//or ham usi model ko use karke jitna vi database operations hai usko perform karte hai like create karna ko , read karna ho , update karna ho persons ko ya delete karna ho
const Person = mongoose.model('Person', personSchema); // yaha pe person nam ka model bna diya
module.exports = Person;

