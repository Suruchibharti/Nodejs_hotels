const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //js object me convert karne ke baad store karega req.body me and ham directly use karenge

const Person = require('./models/Person');

app.get('/', function (req, res) {
  res.send('Welcome to my Restaurant')
})

//Import the router files
const personRoutes = require('./routes/personRoutes');

//Use the routers
app.use('/person', personRoutes);

app.listen(3000 , ()=>{
   console.log("we are listing on port 3000")
})




/* depreciated the callback in save method instead we use async and await
//POST route to add a person
app.post('/person',(req,res) => {

  const data = req.body // Assuming the request body contains the person data
 
  //Create a new Person (row)document using the Mongoose model
  const newPerson = new Person(data);

  //save the new person to the database and it returns callback
  newPerson.save((error, savedPerson) => {
         if(error){
          console.log('Error saving person:' , error);
          res.status(500).json({error:'Internal server error'})
         }else{
          console.log('data saved successfully');
          res.status(200).json(savedPerson);
         } // ye POST method tyar ho gya jiske through data saved 
  })
*/