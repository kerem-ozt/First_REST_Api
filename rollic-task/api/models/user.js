const mongoose = require('mongoose');

//Data schema for users to be stored in MongoDB
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type : String, required: true },
    email: { type : String, unique : true, required: true, dropDups: true },
    password: { type : String, required: true }
});

//Export schema for use in CRUD operations
module.exports = mongoose.model('User', userSchema);