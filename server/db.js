// db.js

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connectionString = process.env.CONNECTION_STRING;

    const conn = await mongoose.connect(`${connectionString}/Database`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Close MongoDB connection when Node.js process ends
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection disconnected through app termination");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await mongoose.connection.close();
  console.log("MongoDB connection disconnected through app termination");
  process.exit(0);
});

module.exports = connectDB;
