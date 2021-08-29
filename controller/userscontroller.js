const jwt = require("jsonwebtoken");
const { user } = require("passport");
const { json } = require("body-parser");
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require("../models/users");
const { response } = require("express");
const nodemailer = require('nodemailer');
const SecretCode = require('../models/secretcode');
dotenv.config({ path: '../config/credential.env' })
global.crypto = require('crypto');

module.exports.register = async (req, res) => {

    try {
        // Get user input
        const { firstName, lastName, email, password,phone,userActiveStatus,UserType } = req.body;
    
        // Validate user input
        if (!(email && password && firstName && lastName)) {
          res.status(400).send("All input is required");
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          firstName,
          lastName,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
          phone,
          userActiveStatus,
          UserType
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.SECRET_KEY,
          {
            expiresIn: "5h",
          }
        );
        // save user token
        user.token = token;

        // create secret code here for verify email
        const secretCode = await  SecretCode.create({
            _userId: user._id,
            token: crypto.randomBytes(70).toString('hex')
        })

        // send mail here
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: `${process.env.EMAIL_ADDRESS}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            },
        });
        const mailOptions = {
            from: 'subhamoy286@gmail.com',
            to: user.email,
            subject: 'Verify Your Email Address',
            text: 'Hello ' + user.firstName + ',\n\n' + 'Please  clicking the link below\n\nThank You!\n',
            html: '<div>Hi '+user.firstName+'</div><p>You have been invited to EngineerBabu. <button style="background-color: #92a8d1;"><a href="http://localhost:8000/api/user/verify/' + secretCode.token + '">Click here</a></button> to verify your email address.</p><br></br><div>Regards,</div><div>Team EngineerBabu</div>'

        };
       const data = await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return  res.status(400).json({
                    success: false,
                    message: 'An error occured.',
                    results: error
                });
             
            } else {
                // if mail sent then save this pass to db
                return res.status(201).json({
                    success:true,
                    message:"User is Register Succeffuly. Verify mail sent to user",
                    results:user
                });
              
            }
        
        });
        
      } catch (err) {
        console.log(err);
      }


}
module.exports.login = async (req,res)=>{
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.SECRET_KEY,
            {
              expiresIn: "5h",
            }
          );
    
          // save user token
          user.token = token;
    
          // user
          return res.status(201).json({
            success:true,
            message:"User is Login Succeffuly",
            results:user
        });
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
}
module.exports.verifyEmail= async (req,res)=>{
  try{
    await SecretCode.findOne({token: req.body.token}, function (err, token) {
        // token is not found into database i.e. token may have expired
        if (!token) {
            return res.status(400).json({message: 'Something went wrong. Your verification link has expired.',
            status:400
    });
        } else {
            User.findOne({_id: token._userId}, function (err, user) {
                if (!user) {
                    res.status(401).json({message:"We are unable to locate user",
                    status:400
            });
                } else {
                    user.updateOne({
                        "userActiveStatus": "Active",
                    }, function (err, result) {
                        if (err) {
                            res.status(400).json({message:"error is in verification creation",status:400});
                        } else {
                            res.status(2001).json(200,{message:"User Verified  successfully.",
                            status:200,
                            data:result
                        });
                        }
                    })
                }
            });
        }
    });
}
catch(error){
    console.log(err);
}
}
