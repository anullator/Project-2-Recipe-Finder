const { User } = require('../../models/user');
const bcrypt = require('bcrypt');

// User registration controller
const userReg = async(req, res) => {
  try{
    const { username, email, password } = req.body;

    // Validate input
    if(!username || !email || !password) {
      return res.status(400).json({ message: 'Please enter a name, email, and password.'});
    }

    // Check if the email already exists
    const userExists = await User.findOne({ where: { email } });
    if(userExists) {
      return res.status(400).json({ message: 'An account is already associated with this email.' });
    }

    // Password hashing
    const pwHash = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = {
      username,
      email,
      password: pwHash,
    };

    const userData = await User.create(newUser);
    // Sends a success response if a new user was created successfully
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json({ message: 'An error occurred during user registration', error: err.message });
  }
};


// User login controller


// User logout controller

module.exports = { userReg };