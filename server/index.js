var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");

var router = require("./routes/router.js");

var app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb://127.0.0.1:27017/crmsigma?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.1",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Server is connecting on MongoDB");
    app.listen(3001, () => {
      console.log("Server is running on http://81.94.159.226:3001");
      require("./bot.js");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
