const passport = require("passport");
const dotenv = require("dotenv");
const JWTStrategy = require("passport-jwt").Strategy;

const ExtractJWT = require("passport-jwt").ExtractJwt;

const User = require("../models/users");
dotenv.config({ path: "./config/credential.env" });
// core function jwt packege for token generation
let opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN_STRING,
};
passport.use('user-rule',
  new JWTStrategy(opts, function (jwtPayLoad, done) {
    console.log("jwtPayLoadUser", jwtPayLoad);
// find user here
    User.findById(jwtPayLoad.userId, function (err, user) {
      if (err) {
        console.log("Error in finding the user from JWT");
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);


module.exports = passport;
