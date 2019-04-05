const express = require('express');
const path = require('path');

const app = express();
const User = require('./user');


// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//set public folder

app.use(express.static(path.join(__dirname,'public')));

app.post('/api/v1/sign-up',(req,res) =>{
   
     let email= req.body.email;
     let password = req.body.password;
     let firstName = req.body.firstName;
     let lastName = req.body.lastName


     let user =    new User(firstName,lastName,password,email);
     let person  =    new User(firstName,lastName,password,email);
   
    let userDetail =  person.save();
    user.save();
     if(!userDetail) return res.status(400).json({status:400, msg:"error in the values your submitted"});
     res.status(200).json({status:200, data : userDetail});


  
});


//Set environment Port
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('listening to port ' + PORT);
});