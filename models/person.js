const mongoose = require('mongoose')


// Defining Person Schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        require : true,
    },
    age: {
        type : Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        require: true
    },
    mobile: {
        type: String,
        require : true,
    },
    email: {
        type: String,
        require: true,
        unique : true
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        require : true
    }
})

const person = mongoose.model("person", personSchema);
module.exports = person;

// export const person = mongoose.model("person", personSchema);
