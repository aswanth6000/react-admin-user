const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    fullname : {
        type : String, 
        required : true
    },
    email : {
        type: String ,
        required : true,
        unique: true
    },
    password: {
        type: String,
        required : true
    },
    createdAt: {
        type: Date,
        default: new Date(),
      },
})

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};
const User = mongoose.model("user", userSchema);

module.exports = {User}