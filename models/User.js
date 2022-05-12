const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  collections: [{ type: Types.ObjectId, ref: "Collection" }],
  roles: [{ type: String, ref: "Role" }],
});

module.exports = model("User", schema);
