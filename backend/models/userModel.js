const mongoose = require('mongoose');
//npm i validator to validate correct mail is given or not
const validator = require('validator');
//npm i bcrypt to hash the password
const bcrypt = require('bcrypt');
//npm i jsonwebtoken for sequrity
const jwt = require('jsonwebtoken');
//npm i crypto reset password
const crypto = require('crypto');
//schema middleware
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter email'],
    unique: true,
    //npm i validator to validate correct mail is given or not
    validate: [validator.isEmail, 'Please enter valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    maxLength: [6, 'Password cannot exceed 6 characters'],
    select: false,
  },
  avatar: {
    type: String,
    role: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpire: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

userSchema.methods.isValidPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};
//Reset Password
userSchema.methods.getResetToken = function () {
  //Generate Token
  const token = crypto.randomBytes(20).toString('hex');

  //Generate Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(token)
    .digest('hex');
  console.log(this.resetPasswordToken);
  //Set token expire time                     30 mins
  this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

  return token;
};
let schema = mongoose.model('User', userSchema);

module.exports = schema;
