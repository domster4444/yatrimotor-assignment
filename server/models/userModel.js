// userModal.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const userSchema = new Schema({
  userUniqueId: {
    type: String,
    required: true,
    unique: true,
  },
  user_email: {
    type: String,
    required: true,
    unique: true,
  },
  hashed_password: {
    type: String,
    trim: true,
    // lowercase:true,
    // unique:true,
    maxlength: [50, 'password cant be more than 50 characters'],
  },
  role: {
    type: String,
    required: true,
    default: 'admin-account',
  },
  user_name: {
    type: String,
    required: true,
  },

  salt: String, //? it tells us how strong the password is hashed.
});

//! ==============================   VIRTUAL METHODS =================================
//todo: virtual field, that take password in string format and hash it and send db as hashed_password property.
userSchema
  .virtual('password') // this virtual method is going to take the "password"
  .set(function (password) {
    // now after this virtual method takes "password", we going to use set function that will hash that "password" that we got and then save in database with field name "hashed_password"
    this._password = password;
    //? salt is present in the schema.
    // => sets the salt field  in userSchema with the value returned from makeSalt method
    this.salt = this.makeSalt();
    //? hashed_password is present in the schema.
    // => sets the hashed_password field  in userSchema with the value returned from encryptPassword method
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password; //? this is going to return the "password" in text format
  });

//! ==============================   METHODS =================================
userSchema.methods = {
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },
  encryptPassword: function (password) {
    // if not password then our encrypt method will return empty string
    if (!password) {
      return '';
    }
    // this is going to return the hashed password
    try {
      //@ts-ignore
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      // if error occurs while hashing password, it will return empty string
      return '';
    }
  },

  compareWithEncryptedPassword: function (planeTextPassword) {
    return this.encryptPassword(planeTextPassword) === this.hashed_password; //? Will return true or false
  },
};

const User = mongoose.model('User', userSchema);

module.exports = User;
