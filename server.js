const express = require("express");
const app = express();
const db = require("./db");

const bodyParser = require("body-parser");

// Import routes from router
const personRoutes = require("./routers/person.router.js");
const menuItemsRoutes = require("./routers/menuItem.router.js");



// Implementing Authentication using passport
const passport = require("./auth/auth.js");
app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate("local", { session: false });





// MIDDLEWARE....

app.use(bodyParser.json());

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`
  );
  next();
};

// applying this logRequest middleware function for all routes using middleware
app.use(logRequest);





// ROUTING....

app.get("/", function (req, res) {
  res.send("Welcome to my hotel");
});

// routing of /person and /menuitem
app.use("/person", personRoutes);
app.use("/menu", menuItemsRoutes);




app.listen(process.env.PORT || 3000, () => {
  console.log("listen on port 3000");
});
