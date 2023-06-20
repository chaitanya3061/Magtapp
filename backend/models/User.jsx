const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

// Create User model
const User = mongoose.model('User', userSchema);
