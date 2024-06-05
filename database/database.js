const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
// External File
// Function (connection)
// Make a unique function name
// Export

const connectDatabase = () => {
  // mongoose.connect('mongodb+srv://test:test@cluster0.wypanyd.mongodb.net/').then(() => {
  //     console.log('Database Connected')
  mongoose.connect(process.env.MONGODB_CLOUD).then(() => {
    console.log("Database Connected");
  });
};

// Exporting the function
module.exports = connectDatabase;
