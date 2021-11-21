const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  follower: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
    default: () => new Date(),
  },
});

const Follow = mongoose.model("follow", followSchema);
module.exports = Follow;
