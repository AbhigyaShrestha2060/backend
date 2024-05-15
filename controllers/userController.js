const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res) => {
  console.log(req.body);
  // res.send("Create user API is Working")
  // LOGIC FOR REGISTERATION
  // 1. Check incomming data
  // 2. Destructure the incomming data

  const { firstName, lastName, email, password } = req.body;

  // 3. Validate the data (If empty: Stop the process and send response)

  if (!firstName || !lastName || !email || !password) {
    // res.send("Please Enter all Fields")
    res.json({
      success: false,
      message: "Please enter all fields",
    });
  }

  // 4. Error handeling (Try, Catch)

  try {
    // 5. Check is the user is already registered
    const existingUser = await userModel.findOne({ email: email });
    // 5.1 If user found: Send response user already exist
    if (existingUser) {
      // 5.1.1 Stop the process
      return res.json({
        success: false,
        message: "User already Exist",
      });
    }

    //Hashing/Encryption of the password
    const randomSalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, randomSalt);

    // 5.2 If user is new:
    const newUser = new userModel({
      //Fields : Client's Value
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });
    // SAVE TO THE DATABASE
    await newUser.save();

    //SEND THE RESPONSE
    res.json({
      success: true,
      message: "User Created Successfully",
    });

    // 5.2.1 Hash the password

    // 5.2.2 Save to the database

    // 5.2.3 Send successfull response
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const loginUser = async (req, res) => {
  // LOGIC FOR LOGIN
  // 1. Check incomming data
  // 2. Destructure th incomming data
  // 3. Validate the data
  // 4. Error handeling
  // 5. Find the user
  // 5.1 If not found the User: send response
  // 5.1.1 Stop the process
  // 5.2 If found the User :
  // 5.2.1 Hash the password
  // 5.2.2 Check the pssword
  // 5.2.3 If password doesnt match: send response
  // 5.2.4 If password match: send sucessfull response
  const { email, password } = req.body;

  if (!email && !password) {
    return res
      .status(400)
      .json({ success: false, message: "Fill in all the required fields" });
  }
  try {
    const userExists = await User.findOne({ email: email, password: password });
    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Logged in successfull!" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error:${error} " });
  }
};

//ecporting
module.exports = {
  createUser,
};
