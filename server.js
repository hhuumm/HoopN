require("dotenv").config();

const app = require("./app");
const { connectDatabase } = require("./config/database");

const port = Number(process.env.PORT || 3001);

async function start() {
  if (!process.env.SECRET) throw new Error("SECRET is required");
  await connectDatabase();
  app.listen(port, () => console.log(`Hoop'n API listening on port ${port}`));
}

start().catch((error) => {
  console.error(`Hoop'n failed to start: ${error.message}`);
  process.exitCode = 1;
});
