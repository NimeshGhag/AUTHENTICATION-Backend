require("dotenv").config();
const app = require("./src/app");
const port = 3000;
const connectToDB = require("./src/db/db");

connectToDB();
app.listen(port, () => {
  console.log("Server is Running on port 3000");
});
