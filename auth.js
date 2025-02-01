//sets up Passport with a local authentication strategy, using a Person model for user

const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy;
const Person = require('./models/Person');//Adjust the path as needed

passport.use(new LocalStrategy(async (username, password, done) => {
   try{
      // console.log('Received credentials:',username, password);
      const user = await Person.findOne({ username });
      if(!user)
         return done(null, false, { message: 'Incorrect username.' });

      const isPasswordMatch = user.comparePassword(password);//ye function Person.js file me bna hai
      if(isPasswordMatch)
         return done(null, user);
      else
         return done(null, false , { message: 'Incorrect password.'})
   }catch(error){
      return done(error);
   }
}));

module.exports = passport; // Export configured passport
