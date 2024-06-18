const { User } = require("../../models");
const bcrypt = require("bcrypt");

// User registration controller
const userReg = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Please enter a name, email, and password.",
      });
    }

    // Check if the email already exists
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({
        message: "An account is already associated with this email.",
      });
    }

    // Password hashing
    const pwHash = await bcrypt.hash(password, 10);
    console.log('Hashed Password:', pwHash);
    console.log('Raw Password before hashing:', password);

    // Create the new user
    const newUser = {
      username,
      email,
      password: pwHash,
    };

    const userData = await User.create(newUser);
    console.log('User created:', userData);
    // Sends a success response if a new user was created successfully
    res.status(201).json(userData);
  } catch (err) {
    res.status(500).json({
      message: "An error occurred during user registration",
      error: err.message,
    });
  }
};

// User login controller
const userLogin = async (req, res) => {
  try {
    // console.log for data flow
    console.log('Login attempt for email:', req.body.email);

    if(!req.body.password) {
      console.log('Password not provided in request body');
      return res.status(400).json({
        message: "Password is required. Please try again,",
      });
    }

    // Find the user with matching email
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      console.log('No user found with email:', req.body.email);
      res.status(400).json({
        message: "Incorrect email, username, or password. Please try again.",
      });
      return;
    }

    console.log('Stored hashed password:', userData.password);
    console.log('Entered Password:', req.body.password);

    // This is the original code
    // // Verify the posted password with the password stored in the database
    // const validPw = userData.checkPassword(req.body.password);
    // console.log('Password comparison result:', validPw);

    // if (!validPw) {
    //   console.log('Password mismatch for email:', req.body.email);
    //   res.status(400).json({
    //     message: "Incorrect email, username, or password. Please try again.",
    //   });
    //   return;
    // }

    // // Create session variables based on the logged in user
    // req.session.save(() => {
    //   req.session.user_id = userData.id;
    //   req.session.logged_in = true;

    //   console.log('Login successful for email:', req.body.email);
    //   res.json({ user: userData, message: "Login Successful!" });
    // });


    // This is experimental. Doesn't work either.
    bcrypt.compare(req.body.password, userData.password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({
          message: "An error occurred during password comparison",
          error: err.message,
        });
      }

      console.log('Password comparison result:', result);

      if (!result) {
        console.log('Password mismatch for email:', req.body.email);
        return res.status(400).json({
          message: "Incorrect email, username, or password. Please try again.",
        });
      }

      // Create session variables based on the logged in user
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;

        console.log('Login successful for email:', req.body.email);
        res.json({ user: userData, message: "Login Successful!" });
      });
    });

  } catch (err) {
    console.error('Error during login:', err.message);
    res.status(500).json({
      message: "An error occurred during login",
      error: err.message,
    });
  }
};

// User logout controller
const userLogout = (req, res) => {
  if (req.session.logged_in) {
    // Removed the session variables
    req.session.destroy(() => {
      res.status(200).json({ message: 'Logout successful' });
    });
  } else {
    res.status(404).json({ message: 'No user is logged in' });
  }
};


module.exports = { userReg, userLogin, userLogout };
