const mongoose = require("mongoose");

// Define schema
const userMasterSchema = new mongoose.Schema(
  {
    firstName: { type: "string", required: true },
    lastName: { type: "string", required: false },
    emailId: { type: "string", required: false },
    password: { type: "string", required: true },
    isActive: { type: "boolean", default: true },
    createdBy: { type: "number", required: false, default: 0 },
    modifiedBy: { type: "number", required: false, default: 0 },
    createdDate: { type: "Date", default: Date.now },
    modifiedDate: { type: "Date", default: Date.now },
  },
  {
    // Explicitly set the collection name to match your desired collection
    collection: "UserMaster", // Replace with your desired collection name
  }
);

// Create a model based on schema
const UserMaster = mongoose.model("UserMaster", userMasterSchema);

module.exports = UserMaster;
