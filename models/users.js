const mongoose=require('mongoose');
// user schema
const BasicUserSchema = new mongoose.Schema({
    email:{
        type:String,
        unique: true,
    },
    firstName:{
        type:String,
        default: null,
    },
    lastName:{
        type:String,
        default: null,
    },
    password:{
        type:String,
    },
    phone:{
        type:Number,
        default: null,
    },
    userActiveStatus:{
        type:String,
        enum:["Active","Deactive","Pending"],
    },
    token:{
        type:String,
    },
    UserType:{
        type:String,
        enum:["Admin","Normal"],
    }

},{
    timestamps:true
});




const basic_user=mongoose.model('User',BasicUserSchema);
module.exports=basic_user; 