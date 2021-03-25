const mongoose = require("mongoose");

require("dotenv").config();

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    mongoose
      .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@twittercoursecluster.2hx41.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true,
        }
      )
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error" + err);
      });
  }
}

module.exports = new Database();
