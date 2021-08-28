const express=require('express');
const app=express();
const passport=require('passport');

const passportJwt=require('passport-jwt');
const passportJwtUser=require('./config/passport-user');
const bodyParser=require('body-parser');
const dotenv=require('dotenv');
const connectDb = require('./config/connection');
dotenv.config({path:'./config/credential.env'})
// db class define here
connectDb();
//console.log("db",db);

//define port here
const port = process.env.PORT;
app.use(passport.initialize());
// all data encoded here 
//app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

//app.use(passport.session());
// cors error remove function

// redire to route path in route folder
app.use("/",require('./routes'));



// exress listen port from config data
app.listen(port,function(err){
    if(err){
        console.log(`Error ${err}`);
        return;
    }

    console.log(`Server is running on port:${port}`);
});