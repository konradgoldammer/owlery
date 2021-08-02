const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const app = express();

// Connect to MongoDB
mongoose
  .connect(config.get("mongoURI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("MongoDB connected..."))
  .catch((err) => {
    console.log(err);
  });

// Use JSON body parser
app.use(express.json());

// User routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
