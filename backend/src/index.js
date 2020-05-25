const app = require("./app");

async function main() {
  await app.listen(4000);
  console.log("Server running on port 4000");
}

main();
