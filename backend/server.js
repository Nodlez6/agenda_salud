const app = require("./index");
require("dotenv").config("./.env");

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3002");
});
