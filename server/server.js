const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

global.__basedir = __dirname;

const app = express();

var corsOptions = {
    origin: "http://localhost:4200",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
// db.reportedPosts.sync();
// // drop the table if it already exists
db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
});

require("./app/routes/account.routes")(app);
require("./app/routes/population.routes")(app);

// set port, listen for requests
// const PORT = process.env.PORT || 8080;
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
