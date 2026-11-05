const app = require("./app");

const { connectDB, disconnectDB } = require("./config/db/connection");

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

console.log(PORT)

const server = async (URI) => {
  try {
    if (!URI) {
      throw new Error(`Missing URI`);
    }
    await connectDB(URI);
    const serverInstance = app.listen(PORT, () => {
      console.log(`server running on port http://localhost:${PORT}`);
    });

    const shutdown = async () => {
      console.log("server shudouwn safely..");
      serverInstance.close(async () => {
        await disconnectDB(URI);
        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    console.log(`failed to run server`, error.message);
    process.exit(1);
  }
};

server(MONGO_URI);
