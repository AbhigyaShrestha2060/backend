const userModel = require("../models/userModel");
const createUser = async (req, res) => {
  console.log(req.body);
  // res.send("Create user API is Working")
  // LOGIC FOR REGISTERATION
  // 1. Check incomming data
  // 2. Destructure th incomming data

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
        status: false,
        message: "User already Exist",
      });
    }
    // 5.2 If user is new:
    const newUser = new userModel({
      //Fields : Client's Value
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
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
    res.json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const loginUser = (req, res) => {
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
};

//ecporting
module.exports = {
  createUser,
};
