# Authentication

### import passport and local-passport

        var passport = require("passport");
        var LocalStrategy = require("passport-local");
        const person = require("../models/person");

### implement strategy

        passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
            console.log("Received Credentials :", username, passport);

            const user = await person.findOne({ username });

            if (!user) return done(null, false, { message: "Incorrect username" });

            // then user exist
            const isPasswordMatch = user.password === password ? true : false;

            if (isPasswordMatch) return done(null, user);
            else return done(null, false, { message: "Invalid Password" });
            } catch (error) {
            return done(error);
            }
        })
        );

### Perform this module in seperate file and export it

        module.exports = passport

### Initializa passport in main routing file where you apply authentication

        const passport = require("./auth/auth.js");
        app.use(passport.initialize());

### Create Local AuthMiddleware 

        const localAuthMiddleware = passport.authenticate("local", { session: false });

### And apply on every routing where you want to authenticate

        app.get("/",localAuthMiddleware, function (req, res) {
        res.send("Welcome to my hotel");
        });
        
