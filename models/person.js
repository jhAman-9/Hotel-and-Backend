const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Defining Person Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    require: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

personSchema.pre("save", async function(next) {
  const person = this;

  // Hash the password only if it has been modified or its new
  if (!person.isModified("password")) return next();

  try {
    // creating salt for hashed password
    const salt = await bcrypt.genSalt(10);

    // hash password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    // Override the plane password with the hashed one
    person.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use bcrypt to compare The provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    /*
    compare function automatically extract the salt from the storedPassword and uses it to hash
    the entered password. then compare the resulting hash with the stored hash. If match then 
    indicated the entered password is correct....
     */
    return isMatch;

  } catch (error) {
    throw error;
  }
};


// PROCESS OF BCRYPTING AND DECRYPTING AND COMPARE

// Aman  ----> fiuehi4w547f94vvw9vtrwd64wf
// login ----> kumar

// fiuehi4w547f94vvw9vtrwd64wf ----> extract salt
// salt  + kumar ----> hash ----> dfhgwgfiecibweuifiwfe

const person = mongoose.model("person", personSchema);
module.exports = person;

// export const person = mongoose.model("person", personSchema);
