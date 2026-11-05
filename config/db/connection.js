// /usr/local/mongodb/bin/mongod --dbpath ~/data/db

const mongoose = require("mongoose");

const connectDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log(`connect to database successfully`);
  } catch (error) {
    throw new Error(`failed to connect to database`, error);
  }
};

const disconnectDB = async (uri) => {
  try {
    await mongoose.disconnect(uri);
    console.log(`connect to database successfully`);
  } catch (error) {
    throw new Error(`failed to connect to database`, error);
  }
};

module.exports = { connectDB, disconnectDB };
