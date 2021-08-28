
const mongoose = require("mongoose");
//mongodb connecting function
 const connectDB = async ()=> {
     try{
         const conet =  await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
         });
         
         console.log(`MONGOBD CONNECTED: ${conet.connection.host}`);
     }
     catch{ 
         console.log(`Error ${err.message}`);
         process.exit(1);
     }
 }

 module.exports = connectDB;
