const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const app = express();

// Connect to MongoDB
mongoose
  .connect(config.get("mongoURI"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB connected..."))
  .catch((err) => {
    console.log(err);
  });

// Use JSON body parser
app.use(express.json());

// Use routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/reviews", require("./routes/api/reviews"));
app.use("/api/comments", require("./routes/api/comments"));
app.use("/api/episodes", require("./routes/api/episodes"));
app.use("/api/podcasts", require("./routes/api/podcasts"));
app.use("/api/search", require("./routes/api/search"));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));
