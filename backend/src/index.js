const app = require("./app");
require("dotenv").config();
require("./database");

const PORT = process.env.PORT ? process.env.PORT : 8888;

async function main() {
  await app.listen(PORT);
  console.log("Server running on port:", PORT);
}

main();
