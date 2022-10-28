const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
  origin: "http://localhost:8100"
};

app.use(cors(corsOptions));


app.use(express.json());


app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "backend iniciado" });
});

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

 
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// set port, listen for requests
require("./app/routes/toDo.routes")(app)
require("./app/routes/Photo.routes")(app)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});