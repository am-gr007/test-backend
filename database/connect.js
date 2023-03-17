const mongoose = require("mongoose");

const connectDatabase = (connectionURI) => {
  return mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDatabase;
