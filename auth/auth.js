// AUTHENTICATION

var passport = require("passport");
var LocalStrategy = require("passport-local");
const person = require("../models/person");

// performing authentication using passport and passport-local
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      console.log("Received Credentials :", username, passport);

      const user = await person.findOne({ username });

      if (!user) return done(null, false, { message: "Incorrect username" });

      // then user exist
      //   const isPasswordMatch = user.password === password ? true : false;
      const isPasswordMatch = await user.comparePassword(password);

      if (isPasswordMatch) return done(null, user);
      else return done(null, false, { message: "Invalid Password" });
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
