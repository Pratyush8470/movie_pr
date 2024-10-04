const express = require("express");
const path = require("path");
const routes = require("./router/routes");
const bodyParser = require("body-parser");
let app = express();
let PORT = 4000;
const Path = path.join(__dirname, "/Views");
const db = require("./model/db/mongoose.js");

app.set("views", Path);
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);
app.use(express.static(Path))
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});