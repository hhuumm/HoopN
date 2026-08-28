const mongoose = require("mongoose");

async function connectDatabase() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is required");
  await mongoose.connect(url, { serverSelectionTimeoutMS: 10_000 });
  const { name, host, port } = mongoose.connection;
  console.log(`Connected to MongoDB ${name} at ${host}:${port}`);
  return mongoose.connection;
}

module.exports = { connectDatabase };
