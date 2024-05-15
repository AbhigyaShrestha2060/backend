const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  // 1. Check incoming data
  console.log(req.body);

  // 2. DesStructure the incoming data
  const { firstName, lastName, email, password } = req.body;

  // 3. Validate the data (if empty, stop the process and send response)
  if (!firstName || !lastName || !email || !password) {
    // res.send("Please enter all fields");
    return res.json({
      success: false,
      message: "Please enter all fields!",
    });
  }

  // 4. Error Handling(try catch)
  try {
    // 5. Check if the user is already registered
    const existingUser = await userModel.findOne({ email: email });
    // 5.1 if user found: Send response
    // 5.1.1 stop the process
    if (existingUser) {
      return res.json({
        success: false,
        message: "User Already Exists",
      });
    }

    // Hash the password
    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    // 5.2 if user is new
    const newUser = new userModel({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    // Save to database
    await newUser.save();

    // Send the response
    res.json({
      success: true,
      message: "User Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  // Checking incomming data
  console.log(res.body);

  // Destructuring

  const { email, password } = req.body;

  // Try Catch
  try {
    // Find User Email
    const User = await userModel.findOne({ email: email });
    // Found Data : First Name, Last Name, Email, Password

    // If user not found
    if (!User) {
      return res.json({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal server error",
    });
  }

  // Validation
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please Enter all the fields!",
    });
  }
};

// Exporting
module.exports = {
  createUser,
  loginUser,
};
